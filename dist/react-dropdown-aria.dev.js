'use strict';

var React = require('react');
var PropTypes = require('prop-types');

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var classnames = createCommonjsModule(function (module) {
	/*!
   Copyright (c) 2017 Jed Watson.
   Licensed under the MIT License (MIT), see
   http://jedwatson.github.io/classnames
 */
	/* global define */

	(function () {

		var hasOwn = {}.hasOwnProperty;

		function classNames() {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg) && arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if (module.exports) {
			classNames.default = classNames;
			module.exports = classNames;
		} else {
			window.classNames = classNames;
		}
	})();
});
var classnames_1 = classnames.classnames;

const KEY_CODES = {
  UP_ARROW: 38,
  DOWN_ARROW: 40,
  ENTER: 13,
  ESCAPE: 27,
  TAB: 9,
  PAGE_UP: 33,
  PAGE_DOWN: 34
};

const NAVIGATION_KEYS = [KEY_CODES.ESCAPE, KEY_CODES.UP_ARROW, KEY_CODES.DOWN_ARROW, KEY_CODES.PAGE_UP, KEY_CODES.PAGE_DOWN];

// import OptionItem from '../components/OptionItem';


/*
This file needs changes once Enzyme updates to be able to handle forwardRef in tests
*/

function defaultOptionRenderer(selectedOption, options, selectedOptionClassName, optionClassName, onOptionClicked, elementsRef) {
  return options.map(option => {
    const { groupOptions, label, value, className } = option;

    if (groupOptions) {
      // Is group of options
      return React.createElement(
        'div',
        { key: label, className: 'dropdown-group' },
        React.createElement(
          'div',
          { className: 'dropdown-group-heading' },
          React.createElement(
            'div',
            null,
            label.toUpperCase()
          ),
          React.createElement(
            'div',
            null,
            groupOptions.length
          )
        ),
        option.groupOptions.map(groupOption => {
          const groupOptionClass = classnames(groupOption.className, groupOption.value === selectedOption ? selectedOptionClassName || 'dropdown-option-selected' : optionClassName || 'dropdown-option');
          return React.createElement(
            'button',
            {
              'aria-label': groupOption.ariaLabel,
              className: groupOptionClass,
              onClick: onOptionClicked,
              onKeyDown: onOptionClicked,
              ref: el => el && elementsRef.push(el),
              tabIndex: '-1',
              title: groupOption.title,
              type: 'button',
              key: groupOption.value
            },
            groupOption.iconClass && React.createElement('i', { className: `${groupOption.iconClass} option-icon` }),
            groupOption.value
          );
          /* return (
            <OptionItem
              key={groupOption.value}
              optionClass={groupOptionClass}
              onOptionClicked={onOptionClicked}
              option={groupOption}
              ref={el => el && elementsRef.push(el)}
            />
          ); */
        })
      );
    }

    const optionClass = classnames(className, value === selectedOption ? selectedOptionClassName || 'dropdown-option-selected' : optionClassName || 'dropdown-option');
    return React.createElement(
      'button',
      {
        'aria-label': option.ariaLabel,
        className: optionClass,
        onClick: onOptionClicked,
        onKeyDown: onOptionClicked,
        ref: el => el && elementsRef.push(el),
        tabIndex: '-1',
        title: option.title,
        type: 'button',
        key: option.value
      },
      option.iconClass && React.createElement('i', { className: `${option.iconClass} option-icon` }),
      option.value
    );
    // return (
    //   <OptionItem
    //     key={value}
    //     optionClass={optionClass}
    //     onOptionClicked={onOptionClicked}
    //     option={option}
    //     ref={el => el && elementsRef.push(el)}
    //   />
    // );
  });
}

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = e => {
      if (!this.container.contains(e.target)) {
        this.closeDropdown();
      }
    };

    this.onDropdownClick = ({ nativeEvent }) => {
      const { disabled } = this.props;

      if (nativeEvent instanceof KeyboardEvent) {
        // eslint-disable-line no-undef
        if (nativeEvent.keyCode !== KEY_CODES.ENTER) return;
        nativeEvent.preventDefault();
      }

      if (!disabled) {
        this.setState(p => ({ open: !p.open, focusedIndex: p.open ? -1 : p.focusedIndex }));
      }
    };

    this.onOptionClicked = ({ nativeEvent }) => {
      const { setSelected } = this.props;

      if (nativeEvent instanceof KeyboardEvent) {
        // eslint-disable-line no-undef
        if (nativeEvent.keyCode !== KEY_CODES.ENTER) return;
        nativeEvent.preventDefault();
      }

      const selectedOption = nativeEvent.target.innerText;
      setSelected(selectedOption);
      this.setState({ open: false, internalSelectedOption: selectedOption });
      if (nativeEvent.keyCode && nativeEvent.keyCode === KEY_CODES.ENTER) this.button.focus();
    };

    this.onKeyDown = ({ nativeEvent }) => {
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
    };

    this.onNavigation = keyCode => {
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
    };

    this.setFocus = () => {
      const { focusedIndex } = this.state;
      this.elements[focusedIndex].focus();
    };

    this.closeDropdown = (focus = false) => {
      this.setState(p => ({ open: false, focusedIndex: p.internalSelectedOption ? p.focusedIndex : -1 }));
      if (focus) {
        this.button.focus();
      }
    };

    this.searchDropdown = key => {
      const { searchTerm } = this.state;
      const oldTerm = searchTerm;
      this.setState(p => ({ searchTerm: p.searchTerm + key }));
      this.searchList(oldTerm + key);

      this.clearTimer();
      const timer = setTimeout(this.clearSearch, 1500);
      this.setState({ searchTimer: timer });
    };

    this.clearTimer = () => {
      const { searchTimer } = this.state;
      if (searchTimer !== -1) {
        clearTimeout(searchTimer);
        this.setState({ searchTimer: -1 });
      }
    };

    this.clearSearch = () => {
      this.setState({ searchTerm: '' });
    };

    this.searchList = value => {
      const element = this.elements.find(el => el.innerText.toLowerCase().indexOf(value) === 0);
      if (element) element.focus();
    };

    this.renderOptions = () => {
      const { optionRenderer, selectedOption, selectedOptionClassName, optionClassName, options } = this.props;
      const { internalSelectedOption } = this.state;
      this.elements = []; // Reset ref array

      if (optionRenderer) {
        return optionRenderer(selectedOption || internalSelectedOption, options, this.onOptionClicked, this.elements);
      }

      return defaultOptionRenderer(selectedOption, options, selectedOptionClassName, optionClassName, this.onOptionClicked, this.elements);
    };

    this.state = {
      open: false,
      searchTerm: '',
      searchTimer: -1,
      focusedIndex: -1,
      internalSelectedOption: null
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

  render() {
    // Please Keep Alphabetical
    const {
      ariaDescribedBy,
      ariaLabel,
      ariaLabelledBy,
      arrowRenderer,
      centerText,
      contentClassName,
      buttonClassName,
      disabled,
      height,
      hideArrow,
      id,
      maxContentHeight,
      openUp,
      placeholder,
      selectedOption,
      selectedValueClassName,
      width
    } = this.props;

    const {
      internalSelectedOption,
      open
    } = this.state;

    const displayedValue = selectedOption || internalSelectedOption || placeholder || '';
    const dropdownButtonClass = classnames('dropdown-select', buttonClassName);
    const displayedValueClass = classnames('displayed-value', selectedValueClassName, { grey: !selectedOption && !internalSelectedOption, 'no-arrow': hideArrow, 'center-text': centerText });
    const contentClass = classnames('dropdown-content', contentClassName, { 'dropdown-content-open': open, 'dropdown-content-down': !openUp, 'dropdown-content-up': openUp });
    const arrowClass = open ? 'dropdown-arrow up' : 'dropdown-arrow down';
    const listStyle = maxContentHeight ? { maxHeight: maxContentHeight, overflowY: 'scroll' } : {};

    return React.createElement(
      'div',
      {
        className: 'dropdown',
        onKeyDown: this.onKeyDown,
        ref: div => this.container = div,
        style: { width, height }
      },
      React.createElement(
        'button',
        {
          'aria-label': ariaLabel,
          'ari-describedby': ariaDescribedBy,
          'aria-labelledby': ariaLabelledBy,
          className: dropdownButtonClass,
          disabled: disabled,
          id: id,
          onClick: this.onDropdownClick,
          onKeyDown: this.onDropdownClick,
          ref: btn => this.button = btn,
          type: 'button'
        },
        React.createElement(
          'div',
          { className: displayedValueClass },
          displayedValue
        ),
        !hideArrow && !arrowRenderer && React.createElement('div', { className: arrowClass }),
        !hideArrow && arrowRenderer && arrowRenderer(open)
      ),
      React.createElement(
        'ul',
        { className: contentClass, style: listStyle },
        this.renderOptions()
      )
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
  width: PropTypes.number
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
  width: null
};

module.exports = Dropdown;
