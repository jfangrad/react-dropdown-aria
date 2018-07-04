import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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
      focusedIndex: -1,
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

    if (NAVIGATION_KEYS.includes(keyCode)) {
      nativeEvent.preventDefault();
      this.onNavigation(keyCode);
    } else if (key.length === 1) {
      this.searchDropdown(key);
    }
  }

  onNavigation = (keyCode) => {
    const { focusedIndex } = this.state;
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
        if (focusedIndex === -1 || focusedIndex === this.elements.length - 1) {
          this.setState({ focusedIndex: 0 }, this.setFocus);
        } else {
          this.setState(p => ({ focusedIndex: p.focusedIndex + 1 }), this.setFocus);
        }
        break;
      case KEY_CODES.ESCAPE:
        this.setState({ open: false });
        break;
      default:
        break;
    }
  }

  setFocus = () => {
    const { focusedIndex } = this.state;
    this.elements[focusedIndex].focus();
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
    const { selectedOption, options } = this.props;
    this.elements = []; // Reset reference array
    return options.map((option) => {
      const selected = option.name === selectedOption;
      return <DropdownItem key={option.name} ref={el => (el && this.elements.push(el))} selected={selected} onOptionClicked={this.onOptionClicked} option={option} />;
    });
  }

  render() {
    const { selectedOption, placeholder, className, maxContentHeight, disabled, width, height, hideArrow, centerText } = this.props;
    const { open } = this.state;

    const displayedValue = selectedOption || placeholder || '';
    const dropdownButtonClass = classNames('dropdown-select', className);
    const displayedValueClass = classNames('displayed-value', { grey: !selectedOption, 'no-arrow': hideArrow, 'center-text': centerText });
    const contentClass = classNames('dropdown-content', { 'dropdown-content-open': open });
    const arrowClass = open ? 'dropdown-arrow up' : 'dropdown-arrow down';
    const listStyle = maxContentHeight ? { maxHeight: maxContentHeight, overflowY: 'scroll' } : {};

    return (
      <div className="dropdown" onBlur={this.onBlur} onKeyDown={this.onKeyDown} style={createStyleObject(width, height)}>
        <button className={dropdownButtonClass} type="button" onClick={this.onDropdownClick} disabled={disabled} aria-label={displayedValue}>
          <div className={displayedValueClass}>{ displayedValue }</div>
          { !hideArrow && <div className={arrowClass} /> }
        </button>
        <ul className={contentClass} style={listStyle}>{ this.renderOptions() }</ul>
      </div>
    );
  }
}

Dropdown.propTypes = {
  className: PropTypes.string,
  centerText: PropTypes.bool,
  disabled: PropTypes.bool,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  selectedOption: PropTypes.string,
  setSelected: PropTypes.func.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  maxContentHeight: PropTypes.number,
  hideArrow: PropTypes.bool,
};

Dropdown.defaultProps = {
  className: '',
  centerText: 'false',
  disabled: false,
  placeholder: 'Select ...',
  selectedOption: null,
  width: null,
  height: null,
  maxContentHeight: null,
  hideArrow: false,
};

export default Dropdown;
