import React, { Component, MouseEvent, KeyboardEvent, createRef } from 'react';
import { css, cx } from 'emotion';
import { KEY_CODES, NAVIGATION_KEYS } from '../utils/helper';
import defaultOptionRenderer from '../utils/defaultOptionRenderer';
import defaultStyles from '../styles/Dropdown';
import { DropdownOption, OptionGroup, Option } from './OptionItem';

type StyleFunction = (base: {}, state: DropdownState, extraState?: {}) => {};

interface DropdownStyle {
  arrow?: StyleFunction,
  dropdownButton?: StyleFunction,
  displayedValue?: StyleFunction,
  dropdownWrapper?: StyleFunction,
  groupContainer?: StyleFunction,
  groupHeading?: StyleFunction,
  optionContainer?: StyleFunction,
  optionItem?: StyleFunction,
};

export interface DropdownState {
  open: boolean,
  searchTerm: string,
  searchTimer: NodeJS.Timer | null,
  focusedIndex: number,
  internalSelectedOption: string,
};

export interface DropdownProps {
  ariaDescribedBy: string,
  ariaLabel: string,
  ariaLabelledBy: string,
  arrowRenderer: (open: boolean) => React.ReactNode,
  buttonClassName: string,
  centerText: boolean,
  contentClassName: string,
  disabled: boolean,
  height: number,
  hideArrow: boolean,
  id: string,
  maxContentHeight: number,
  openUp: boolean,
  options: DropdownOption[],
  optionClassName: string,
  optionRenderer: (selectedOption: string, optionsArray: DropdownOption[], onOptionClicked: (e:  MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>) => void, elementsRef: any[], getStyle: (key: string, extraState: {}) => string) => React.ReactNode,
  pageKeyTraverseSize: number,
  placeholder: string,
  searchable: boolean,
  selectedOption: string,
  selectedOptionClassName: string,
  selectedValueClassName: string,
  setSelected: (option: string) => void,
  style: DropdownStyle,
  width: number,
}

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
    if (defaultOption && (defaultOption as OptionGroup).groupOptions) {
      defaultOption = (defaultOption as OptionGroup).groupOptions[0];
    }

    this.state = {
      focusedIndex: -1,
      internalSelectedOption: (defaultOption as Option).value,
      open: false,
      searchTerm: '',
      searchTimer: null,
    };
  }

  public componentDidMount() {
    document.addEventListener('mouseup', this.onClick, false); // eslint-disable-line no-undef
    document.addEventListener('touchend', this.onClick, false); // eslint-disable-line no-undef
  }

  public componentWillUnmount() {
    document.removeEventListener('mouseup', this.onClick); // eslint-disable-line no-undef
    document.removeEventListener('touchend', this.onClick); // eslint-disable-line no-undef
  }

  public render() {
    // Please Keep Alphabetical
    const {
      ariaDescribedBy,
      ariaLabel,
      ariaLabelledBy,
      arrowRenderer,
      contentClassName,
      buttonClassName,
      disabled,
      hideArrow,
      id,
      placeholder,
      selectedOption,
      selectedValueClassName,
    } = this.props;

    const {
      internalSelectedOption,
      open,
    } = this.state;

    const displayedValue = selectedOption || internalSelectedOption || placeholder || '';
    const wrapperClass = this.getStyle('dropdownWrapper');
    const dropdownButtonClass = cx(buttonClassName, this.getStyle('dropdownButton'));
    const displayedValueClass = cx(selectedValueClassName, this.getStyle('displayedValue'));
    const contentClass = cx(contentClassName, this.getStyle('optionContainer'));
    const arrowClass = this.getStyle('arrow');

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
          { !hideArrow && !arrowRenderer && <div className={arrowClass} /> }
          { !hideArrow && arrowRenderer && arrowRenderer(open) }
        </button>
        <ul className={contentClass}>{ this.renderOptions() }</ul>
      </div>
    );
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

    if (nativeEvent instanceof KeyboardEvent) { // eslint-disable-line no-undef
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
    const key = nativeEvent.key && nativeEvent.key.toLowerCase();
    const { keyCode } = nativeEvent;
    const { searchable } = this.props;

    if (NAVIGATION_KEYS.indexOf(keyCode) !== -1) {
      nativeEvent.preventDefault();
      this.onNavigation(keyCode);
    } else if (keyCode === KEY_CODES.TAB) {
      this.closeDropdown();
    } else if (key.length === 1 && searchable) {
      this.searchDropdown(key);
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
        if (focusedIndex === -1) {
          this.setState({ focusedIndex: 0 }, this.setFocus);
        } else if (focusedIndex - pageKeyTraverseSize < 0) {
          this.setState({ focusedIndex: this.elements.length - 1 }, this.setFocus);
        } else {
          this.setState(p => ({ focusedIndex: p.focusedIndex - pageKeyTraverseSize - 1 }), this.setFocus);
        }
        break;
      case KEY_CODES.PAGE_DOWN:
        this.setState(p => ({ focusedIndex: (p.focusedIndex + pageKeyTraverseSize - 1) % this.elements.length }), this.setFocus);
        break;
      case KEY_CODES.ESCAPE:
        this.closeDropdown(true);
        break;
      default:
        break;
    }
  }

  private getStyle = (key: string, extraState?: {}) => {
    const { style } = this.props;
    const baseStyle = defaultStyles[key](this.props, this.state, extraState);
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

  private searchList = (value: string) => {
    const element: React.RefObject<HTMLButtonElement> = (this.elements as any).find(
      (el: React.RefObject<HTMLButtonElement>) => el.current && el.current.innerText.toLowerCase().indexOf(value) === 0,
    );
    if (element.current) element.current.focus();
  }
}

export default Dropdown;
