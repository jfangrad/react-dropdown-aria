import React, { Component, MouseEvent, KeyboardEvent, createRef } from 'react';
import { css, cx } from 'emotion';
import { KEY_CODES, NAVIGATION_KEYS, StyleKeys } from '../utils/constants';
import defaultOptionRenderer from '../utils/defaultOptionRenderer';
import defaultStyles from '../styles/Dropdown';
import { StyleKey, ExtraState, DropdownProps, DropdownState } from '../utils/types';
import { isOptionGroup } from '../utils/helper';

class Dropdown extends Component<DropdownProps, DropdownState> {
  public static defaultProps = {
    ariaDescribedBy: null,
    ariaLabel: null,
    ariaLabelledBy: null,
    arrowRenderer: undefined,
    buttonClassName: undefined,
    centerText: false,
    contentClassName: null,
    disabled: false,
    height: null,
    hideArrow: false,
    id: null,
    maxContentHeight: null,
    openUp: false,
    optionClassName: null,
    optionRenderer: undefined,
    options: [],
    pageKeyTraverseSize: 10,
    placeholder: 'Select ...',
    searchable: true,
    selectedOption: null,
    selectedOptionClassName: null,
    selectedValueClassName: null,
    style: {},
    width: null,
  };

  public state: DropdownState;
  private elements: HTMLButtonElement[] = [];
  private container = createRef<HTMLDivElement>();
  private button = createRef<HTMLButtonElement>();

  constructor(props: DropdownProps) {
    super(props);

    let defaultOption = props.options[0] || { value: ''};
    if (defaultOption && isOptionGroup(defaultOption)) {
      defaultOption = defaultOption.groupOptions[0];
    }

    this.state = {
      focusedIndex: -1,
      internalSelectedOption: defaultOption.value,
      open: false,
      searchTerm: '',
      searchTimer: null,
    };
  }

  public componentDidMount() {
    document.addEventListener('mouseup', this.onClick, false);
    document.addEventListener('touchend', this.onClick, false);
  }

  public componentWillUnmount() {
    document.removeEventListener('mouseup', this.onClick);
    document.removeEventListener('touchend', this.onClick);
  }

  public render() {
    const {
      ariaDescribedBy,
      ariaLabel,
      ariaLabelledBy,
      contentClassName,
      buttonClassName,
      disabled,
      id,
      placeholder,
      selectedOption,
      selectedValueClassName,
    } = this.props;
    const { internalSelectedOption } = this.state;

    const displayedValue = selectedOption || internalSelectedOption || placeholder || '';
    const wrapperClass = this.getStyle(StyleKeys.DropdownWrapper);
    const dropdownButtonClass = cx(buttonClassName, this.getStyle(StyleKeys.DropdownButton));
    const displayedValueClass = cx(selectedValueClassName, this.getStyle(StyleKeys.DisplayedValue));
    const contentClass = cx(contentClassName, this.getStyle(StyleKeys.OptionContainer));

    return (
      <div
        className={wrapperClass}
        onKeyDown={this.onKeyDown}
        ref={this.container}
      >
        <button
          aria-label={ariaLabel}
          ari-describedby={ariaDescribedBy}
          aria-labelledby={ariaLabelledBy}
          className={dropdownButtonClass}
          disabled={disabled}
          id={id}
          onClick={this.onDropdownClick}
          onKeyDown={this.onDropdownClick}
          ref={this.button}
          type="button"
        >
          <div className={displayedValueClass}>{ displayedValue }</div>
          { this.renderArrow() }
        </button>
        <ul className={contentClass}>
          { this.renderOptions() }
        </ul>
      </div>
    );
  }

  private renderArrow = () => {
    const { hideArrow, arrowRenderer } = this.props;
    const { open } = this.state;
    const arrowClass = this.getStyle(StyleKeys.Arrow);

    if (hideArrow) return null;
    if (arrowRenderer) return arrowRenderer(open);
    return <div className={arrowClass} />
  }

  private renderOptions = () => {
    const { optionRenderer, selectedOption, selectedOptionClassName, optionClassName, options } = this.props;
    const { internalSelectedOption } = this.state;
    this.elements = []; // Reset ref array

    if (optionRenderer) {
      return optionRenderer(selectedOption || internalSelectedOption, options, this.onOptionClicked, this.elements, this.getStyle);
    }

    return defaultOptionRenderer(selectedOption, options, selectedOptionClassName, optionClassName, this.onOptionClicked, this.elements, this.getStyle);
  }

  private onClick = (e: Event) => {
    if (this.container.current && !this.container.current.contains(e.target as Node)) {
      this.closeDropdown();
    }
  }

  private onDropdownClick = ({ nativeEvent }: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>) => {
    const { disabled } = this.props;

    if (nativeEvent instanceof KeyboardEvent) {
      if (nativeEvent.keyCode !== KEY_CODES.ENTER) return;
      nativeEvent.preventDefault();
    }

    if (!disabled) {
      this.setState((p: DropdownState) => ({ open: !p.open, focusedIndex: p.open ? -1 : p.focusedIndex }));
    }
  }

  private onOptionClicked = ({ nativeEvent }: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>) => {
    const { setSelected } = this.props;

    if (nativeEvent instanceof KeyboardEvent) {
      if (nativeEvent.keyCode !== KEY_CODES.ENTER) return;
      nativeEvent.preventDefault();
    }

    if (nativeEvent.target) {
      const selectedOption = (nativeEvent.target as HTMLButtonElement).innerText;
      setSelected(selectedOption);
      this.setState({ open: false, internalSelectedOption: selectedOption });
      if (nativeEvent instanceof KeyboardEvent && nativeEvent.keyCode && nativeEvent.keyCode === KEY_CODES.ENTER && this.button.current) {
        this.button.current.focus();
      }
    }
  }

  private onKeyDown = ({ nativeEvent }: KeyboardEvent) => {
    const { keyCode, key } = nativeEvent;
    const { searchable } = this.props;

    if (NAVIGATION_KEYS.indexOf(keyCode) !== -1) {
      nativeEvent.preventDefault();
      this.onNavigation(keyCode);
    } else if (keyCode === KEY_CODES.TAB) {
      this.closeDropdown();
    } else if (key.length === 1 && searchable) {
      this.searchDropdown(key.toLowerCase());
    }
  }

  private onNavigation = (keyCode: number) => {
    const { focusedIndex } = this.state;
    const { pageKeyTraverseSize } = this.props;

    switch (keyCode) {
      case KEY_CODES.UP_ARROW:
        if (focusedIndex === -1) {
          this.setState({ focusedIndex: 0 }, this.setFocus);
        } else if (focusedIndex === 0) {
          this.setState({ focusedIndex: this.elements.length - 1 }, this.setFocus);
        } else {
          this.setState(p => ({ focusedIndex: p.focusedIndex - 1 }), this.setFocus);
        }
        break;
      case KEY_CODES.DOWN_ARROW:
        this.setState(p => ({ focusedIndex: (p.focusedIndex + 1) % this.elements.length }), this.setFocus);
        break;
      case KEY_CODES.PAGE_UP:
        if (focusedIndex === -1 || (focusedIndex - pageKeyTraverseSize < 0 && focusedIndex !== 0)) {
          this.setState({ focusedIndex: 0 }, this.setFocus);
        } else if (focusedIndex - pageKeyTraverseSize < 0) {
          this.setState({ focusedIndex: this.elements.length - 1 }, this.setFocus);
        } else {
          this.setState(p => ({ focusedIndex: p.focusedIndex - pageKeyTraverseSize }), this.setFocus);
        }
        break;
      case KEY_CODES.PAGE_DOWN:
        if (focusedIndex === -1 || focusedIndex === this.elements.length - 1) {
          this.setState({ focusedIndex: 0 }, this.setFocus);
        } else if (focusedIndex + pageKeyTraverseSize > this.elements.length - 1) {
          this.setState({ focusedIndex: this.elements.length - 1 }, this.setFocus);
        } else {
          this.setState(p => ({ focusedIndex: (p.focusedIndex + pageKeyTraverseSize) % this.elements.length }), this.setFocus);
        }
        break;
      case KEY_CODES.ESCAPE:
        this.closeDropdown(true);
        break;
      default:
        break;
    }
  }

  private getStyle = (key: StyleKey, extraState?: ExtraState) => {
    const { style } = this.props;
    const baseStyle = defaultStyles[key](this.props, this.state, extraState || {});
    const customStyle = style[key];
    return customStyle ? css(customStyle(baseStyle, this.state, extraState)) : css(baseStyle);
  }

  private setFocus = () => {
    const { focusedIndex } = this.state;
    const element = this.elements[focusedIndex];
    if (element) {
      element.focus();
    }
  }

  private closeDropdown = (focus = false) => {
    this.setState(p => ({ open: false, focusedIndex: p.internalSelectedOption ? p.focusedIndex : -1 }));
    if (focus && this.button.current) {
      this.button.current.focus();
    }
  }

  private searchDropdown = (key: string) => {
    const { searchTerm } = this.state;
    const oldTerm = searchTerm;
    this.setState(p => ({ searchTerm: p.searchTerm + key }));
    this.searchList(oldTerm + key);

    this.clearTimer();
    const timer = setTimeout(this.clearSearch, 1500);
    this.setState({ searchTimer: timer });
  }

  private searchList = (value: string) => {
    const element = this.elements.find(el => el && el.innerText.toLowerCase().indexOf(value) === 0);
    if (element) element.focus();
  }

  private clearTimer = () => {
    const { searchTimer } = this.state;
    if (searchTimer) {
      clearTimeout(searchTimer);
      this.setState({ searchTimer: null });
    }
  }

  private clearSearch = () => {
    this.setState({ searchTerm: '' });
  }
}

export default Dropdown;
