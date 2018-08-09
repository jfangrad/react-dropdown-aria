import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { KEY_CODES, NAVIGATION_KEYS } from './utils/helper';
import './styles/Dropdown.scss';

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

  setFocus = () => {
    const { focusedIndex } = this.state;
    this.elements[focusedIndex].focus();
  }

  closeDropdown = (focus = false) => {
    this.setState({ open: false, focusedIndex: -1 });
    if (focus) {
      this.container.focus();
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
    const { optionRenderer, selectedOption, options } = this.props;
    const { internalSelectedOption } = this.state;
    this.elements = []; // Reset ref array

    if (optionRenderer) {
      return optionRenderer(selectedOption || internalSelectedOption, options, this.onOptionClicked, this.elements);
    }

    return options.map((option) => {
      const optionClass = classNames(option.className, (option.value === selectedOption) ? 'dropdown-option-selected' : 'dropdown-option');
      return (
        <button
          aria-label={option.ariaLabel}
          className={optionClass}
          key={option.value}
          onClick={this.onOptionClicked}
          onKeyDown={this.onOptionClicked}
          ref={btn => btn && this.elements.push(btn)}
          tabIndex="-1"
          title={option.title}
          type="button"
        >
          { option.iconClass && <i className={`${option.iconClass} option-icon`} />}
          { option.value }
        </button>
      );
    });
  }

  render() {
    // Please Keep Alphabetical
    const {
      ariaDescribedBy,
      ariaLabel,
      ariaLabelledBy,
      arrowRenderer,
      centerText,
      className,
      disabled,
      height,
      hideArrow,
      id,
      maxContentHeight,
      openUp,
      placeholder,
      selectedOption,
      width,
    } = this.props;

    const {
      internalSelectedOption,
      open,
    } = this.state;

    const displayedValue = selectedOption || internalSelectedOption || placeholder || '';
    const dropdownButtonClass = classNames('dropdown-select', className);
    const displayedValueClass = classNames('displayed-value', { grey: !selectedOption && !internalSelectedOption, 'no-arrow': hideArrow, 'center-text': centerText });
    const contentClass = classNames('dropdown-content', { 'dropdown-content-open': open, 'dropdown-content-down': !openUp, 'dropdown-content-up': openUp });
    const arrowClass = open ? 'dropdown-arrow up' : 'dropdown-arrow down';
    const listStyle = maxContentHeight ? { maxHeight: maxContentHeight, overflowY: 'scroll' } : {};

    return (
      <div
        className="dropdown"
        onKeyDown={this.onKeyDown}
        ref={div => this.container = div}
        style={{ width, height }}
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
        <ul className={contentClass} style={listStyle}>{ this.renderOptions() }</ul>
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
  className: PropTypes.string,
  centerText: PropTypes.bool,
  disabled: PropTypes.bool,
  height: PropTypes.number,
  hideArrow: PropTypes.bool,
  id: PropTypes.string,
  optionRenderer: PropTypes.func,
  maxContentHeight: PropTypes.number,
  options: PropTypes.array,
  openUp: PropTypes.bool,
  pageKeyTraverseSize: PropTypes.number,
  placeholder: PropTypes.string,
  searchable: PropTypes.bool,
  selectedOption: PropTypes.string,
  setSelected: PropTypes.func.isRequired,
  width: PropTypes.number,
};

// Please Keep Alphabetical
Dropdown.defaultProps = {
  ariaDescribedBy: null,
  ariaLabel: null,
  ariaLabelledBy: null,
  arrowRenderer: undefined,
  className: undefined,
  centerText: false,
  disabled: false,
  height: null,
  hideArrow: false,
  id: undefined,
  openUp: false,
  optionRenderer: undefined,
  options: [],
  maxContentHeight: null,
  pageKeyTraverseSize: 10,
  placeholder: 'Select ...',
  searchable: true,
  selectedOption: null,
  width: null,
};

export default Dropdown;
