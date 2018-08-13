import React, { Component } from 'react';
import { css, cx } from 'emotion';
import PropTypes from 'prop-types';
import { KEY_CODES, NAVIGATION_KEYS } from './utils/helper';
import defaultOptionRenderer from './utils/defaultOptionRenderer';
import defaultStyles from './styles/Dropdown';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      searchTerm: '',
      searchTimer: -1,
      focusedIndex: -1,
      internalSelectedOption: null,
    };
    this.elements = [];
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.onClick, false); // eslint-disable-line no-undef
    document.addEventListener('touchend', this.onClick, false); // eslint-disable-line no-undef
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.onClick); // eslint-disable-line no-undef
    document.removeEventListener('touchend', this.onClick); // eslint-disable-line no-undef
  }

  onClick = (e) => {
    if (!this.container.contains(e.target)) {
      this.closeDropdown();
    }
  }

  onDropdownClick = ({ nativeEvent }) => {
    const { disabled } = this.props;

    if (nativeEvent instanceof KeyboardEvent) { // eslint-disable-line no-undef
      if (nativeEvent.keyCode !== KEY_CODES.ENTER) return;
      nativeEvent.preventDefault();
    }

    if (!disabled) {
      this.setState(p => ({ open: !p.open, focusedIndex: p.open ? -1 : p.focusedIndex }));
    }
  }

  onOptionClicked = ({ nativeEvent }) => {
    const { setSelected } = this.props;

    if (nativeEvent instanceof KeyboardEvent) { // eslint-disable-line no-undef
      if (nativeEvent.keyCode !== KEY_CODES.ENTER) return;
      nativeEvent.preventDefault();
    }

    const selectedOption = nativeEvent.target.innerText;
    setSelected(selectedOption);
    this.setState({ open: false, internalSelectedOption: selectedOption });
    if (nativeEvent.keyCode && nativeEvent.keyCode === KEY_CODES.ENTER) this.button.focus();
  }

  onKeyDown = ({ nativeEvent }) => {
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

  onNavigation = (keyCode) => {
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

  getStyle = (key, extraState) => {
    const { style } = this.props;
    const baseStyle = defaultStyles[key](this.props, this.state, extraState);
    const customStyle = style[key];
    return customStyle ? css(customStyle(baseStyle, this.state, extraState)) : css(baseStyle);
  }

  setFocus = () => {
    const { focusedIndex } = this.state;
    this.elements[focusedIndex].focus();
  }

  closeDropdown = (focus = false) => {
    this.setState(p => ({ open: false, focusedIndex: p.internalSelectedOption ? p.focusedIndex : -1 }));
    if (focus) {
      this.button.focus();
    }
  }

  searchDropdown = (key) => {
    const { searchTerm } = this.state;
    const oldTerm = searchTerm;
    this.setState(p => ({ searchTerm: p.searchTerm + key }));
    this.searchList(oldTerm + key);

    this.clearTimer();
    const timer = setTimeout(this.clearSearch, 1500);
    this.setState({ searchTimer: timer });
  }

  clearTimer = () => {
    const { searchTimer } = this.state;
    if (searchTimer !== -1) {
      clearTimeout(searchTimer);
      this.setState({ searchTimer: -1 });
    }
  }

  clearSearch = () => {
    this.setState({ searchTerm: '' });
  }

  searchList = (value) => {
    const element = this.elements.find(el => el.innerText.toLowerCase().indexOf(value) === 0);
    if (element) element.focus();
  }

  renderOptions = () => {
    const { optionRenderer, selectedOption, selectedOptionClassName, optionClassName, options } = this.props;
    const { internalSelectedOption } = this.state;
    this.elements = []; // Reset ref array

    if (optionRenderer) {
      return optionRenderer(selectedOption || internalSelectedOption, options, this.onOptionClicked, this.elements, this.getStyle);
    }

    return defaultOptionRenderer(selectedOption, options, selectedOptionClassName, optionClassName, this.onOptionClicked, this.elements, this.getStyle);
  }

  render() {
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
    const wrapperClass = this.getStyle('dropdownWrapperStyle');
    const dropdownButtonClass = cx(buttonClassName, this.getStyle('dropdownButtonStyle'));
    const displayedValueClass = cx(selectedValueClassName, this.getStyle('displayedValueStyle'));
    const contentClass = cx(contentClassName, this.getStyle('optionContainerStyle'));
    const arrowClass = this.getStyle('arrowStyle');

    return (
      <div
        className={wrapperClass}
        onKeyDown={this.onKeyDown}
        ref={div => this.container = div}
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
          ref={btn => this.button = btn}
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
}

// Please Keep Alphabetical
Dropdown.propTypes = {
  ariaDescribedBy: PropTypes.string,
  ariaLabel: PropTypes.string,
  ariaLabelledBy: PropTypes.string,
  arrowRenderer: PropTypes.func,
  buttonClassName: PropTypes.string,
  centerText: PropTypes.bool,
  contentClassName: PropTypes.string,
  disabled: PropTypes.bool,
  height: PropTypes.number,
  hideArrow: PropTypes.bool,
  id: PropTypes.string,
  optionRenderer: PropTypes.func,
  maxContentHeight: PropTypes.number,
  options: PropTypes.array,
  optionClassName: PropTypes.string,
  openUp: PropTypes.bool,
  pageKeyTraverseSize: PropTypes.number,
  placeholder: PropTypes.string,
  searchable: PropTypes.bool,
  selectedOption: PropTypes.string,
  selectedOptionClassName: PropTypes.string,
  selectedValueClassName: PropTypes.string,
  setSelected: PropTypes.func.isRequired,
  style: PropTypes.shape({
    arrowStyle: PropTypes.func,
    dropdownButtonStyle: PropTypes.func,
    displayedValueStyle: PropTypes.func,
    dropdownWrapperStyle: PropTypes.func,
    groupContainerStyle: PropTypes.func,
    groupHeadingStyle: PropTypes.func,
    optionContainerStyle: PropTypes.func,
    optionStyle: PropTypes.func,
  }),
  width: PropTypes.number,
};

// Please Keep Alphabetical
Dropdown.defaultProps = {
  ariaDescribedBy: null,
  ariaLabel: null,
  ariaLabelledBy: null,
  arrowRenderer: undefined,
  buttonClassName: undefined,
  centerText: false,
  contentClassName: undefined,
  disabled: false,
  height: null,
  hideArrow: false,
  id: undefined,
  openUp: false,
  optionRenderer: undefined,
  options: [],
  optionClassName: undefined,
  maxContentHeight: null,
  pageKeyTraverseSize: 10,
  placeholder: 'Select ...',
  searchable: true,
  selectedOption: null,
  selectedOptionClassName: undefined,
  selectedValueClassName: undefined,
  style: {},
  width: null,
};

export default Dropdown;
