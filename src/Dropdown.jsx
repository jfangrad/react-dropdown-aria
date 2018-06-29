import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DropdownItem from './Components/DropdownItem';
import { createStyleObject, KEY_CODES, NAVIGATION_KEYS } from './helper';
import './styles/Dropdown.scss';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      searchTerm: '',
      searchTimer: -1,
    };
    this.elements = {};
  }

  onBlur = (e) => {
    const target = e.nativeEvent.relatedTarget;
    if (!target) {
      this.setState({ open: false });
      return;
    }
    const classValue = target.classList.value;
    if (classValue.indexOf('dropdown') === -1) {
      this.setState({ open: false });
    }
  }

  onDropdownClick = () => {
    const { disabled } = this.props;
    if (!disabled) this.setState(p => ({ open: !p.open }));
  }

  onOptionClicked = (e) => {
    const { setSelected } = this.props;
    setSelected(e.nativeEvent.target.innerText);
    this.setState(p => ({ open: !p.open }));
  }

  onKeyDown = ({ nativeEvent }) => {
    const key = nativeEvent.key.toLowerCase();
    const { keyCode } = nativeEvent;

    if (key.length !== 1) return;

    if (NAVIGATION_KEYS.includes(keyCode)) {
      this.onNavigation(keyCode);
    } else {
      this.searchDropdown(key);
    }
  }

  onNavigation = (keyCode) => {
    switch (keyCode) {
      case KEY_CODES.UP_ARROW:

        break;
      case KEY_CODES.DOWN_ARROW:

        break;
      default:
        break;
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
    const { setSelected } = this.props;
    const key = Object.keys(this.elements).find(el => el.toLowerCase().indexOf(value) === 0);
    if (this.elements[key]) {
      this.elements[key].focus();
      setSelected(this.elements[key].innerText);
    }
  }

  renderOptions = () => {
    const { selectedOption, options } = this.props;
    this.elements = {}; // Reset reference array
    return options.map((option) => {
      const selected = option.name === selectedOption;
      return <DropdownItem key={option.name} ref={el => (this.elements[option.name] = el)} selected={selected} onOptionClicked={this.onOptionClicked} option={option} />;
    });
  }

  render() {
    const { selectedOption, placeholder, className, maxContentHeight, disabled, width, height } = this.props;
    const { open } = this.state;

    const displayedValue = selectedOption || placeholder || '';
    const dropdownButtonClass = className ? `${className} dropdown-select` : 'dropdown-select';
    const displayedValueClass = selectedOption ? 'displayed-value' : 'displayed-value grey';
    const contentClass = open ? 'dropdown-content dropdown-content-open' : 'dropdown-content';
    const arrowClass = open ? 'dropdown-arrow up' : 'dropdown-arrow down';
    const listStyle = maxContentHeight ? { maxHeight: maxContentHeight, overflowY: 'scroll' } : {};

    return (
      <div className="dropdown" onBlur={this.onBlur} onKeyDown={this.onKeyDown} style={createStyleObject(width, height)}>
        <button className={dropdownButtonClass} type="button" onClick={this.onDropdownClick} disabled={disabled} aria-label={displayedValue}>
          <div className={displayedValueClass}>{ displayedValue }</div>
          <div className={arrowClass} />
        </button>
        <ul className={contentClass} style={listStyle}>{ this.renderOptions() }</ul>
      </div>
    );
  }
}

Dropdown.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  selectedOption: PropTypes.string,
  setSelected: PropTypes.func.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  maxContentHeight: PropTypes.number,
};

Dropdown.defaultProps = {
  className: '',
  disabled: false,
  placeholder: 'Select ...',
  selectedOption: null,
  width: null,
  height: null,
  maxContentHeight: null,
};

export default Dropdown;
