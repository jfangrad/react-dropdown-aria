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

const DropdownItem = React.forwardRef((props, ref) => {
  const { option, selected, onOptionClicked } = props;
  const optionClass = classnames(option.className, selected ? 'dropdown-option-selected' : 'dropdown-option');

  return React.createElement(
    'button',
    {
      type: 'button',
      className: optionClass,
      tabIndex: '0',
      title: option.name,
      'aria-label': option.ariaLabel,
      onClick: onOptionClicked,
      ref: ref
    },
    option.name
  );
});

DropdownItem.propTypes = {
  option: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  ariaLabel: PropTypes.string
};

function createStyleObject(width, height, maxHeight) {
  const style = {};
  if (width) {
    style.width = width;
  }
  if (height) {
    style.height = height;
  }
  if (maxHeight) {
    style.maxHeight = maxHeight;
    style.overflowY = 'scroll';
  }
  return style;
}

const KEY_CODES = {
  UP_ARROW: 38,
  DOWN_ARROW: 40,
  ENTER: 13,
  ESCAPE: 27
};

const NAVIGATION_KEYS = [KEY_CODES.ESCAPE, KEY_CODES.UP_ARROW, KEY_CODES.DOWN_ARROW];

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.onBlur = e => {
      const target = e.nativeEvent.relatedTarget;
      if (!target) {
        this.setState({ open: false });
        return;
      }
      const classValue = target.classList.value;
      if (classValue.indexOf('dropdown') === -1) {
        this.setState({ open: false });
      }
    };

    this.onDropdownClick = () => {
      const { disabled } = this.props;
      if (!disabled) this.setState(p => ({ open: !p.open }));
    };

    this.onOptionClicked = e => {
      const { setSelected } = this.props;
      setSelected(e.nativeEvent.target.innerText);
      this.setState(p => ({ open: !p.open }));
    };

    this.onKeyDown = ({ nativeEvent }) => {
      const key = nativeEvent.key.toLowerCase();
      const { keyCode } = nativeEvent;

      if (NAVIGATION_KEYS.includes(keyCode)) {
        nativeEvent.preventDefault();
        this.onNavigation(keyCode);
      } else if (key.length === 1) {
        this.searchDropdown(key);
      }
    };

    this.onNavigation = keyCode => {
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
    };

    this.setFocus = () => {
      const { focusedIndex } = this.state;
      this.elements[focusedIndex].focus();
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
      const { selectedOption, options } = this.props;
      this.elements = []; // Reset reference array
      return options.map(option => {
        const selected = option.name === selectedOption;
        return React.createElement(DropdownItem, {
          key: option.name,
          ref: el => el && this.elements.push(el),
          selected: selected,
          onOptionClicked: this.onOptionClicked,
          option: option
        });
      });
    };

    this.state = {
      open: false,
      searchTerm: '',
      searchTimer: -1,
      focusedIndex: -1
    };
    this.elements = {};
  }

  render() {
    const { ariaLabel, id, selectedOption, placeholder, className, maxContentHeight, disabled, width, height, hideArrow, centerText } = this.props;
    const { open } = this.state;

    const displayedValue = selectedOption || placeholder || '';
    const dropdownButtonClass = classnames('dropdown-select', className);
    const displayedValueClass = classnames('displayed-value', { grey: !selectedOption, 'no-arrow': hideArrow, 'center-text': centerText });
    const contentClass = classnames('dropdown-content', { 'dropdown-content-open': open });
    const arrowClass = open ? 'dropdown-arrow up' : 'dropdown-arrow down';
    const listStyle = maxContentHeight ? { maxHeight: maxContentHeight, overflowY: 'scroll' } : {};

    return React.createElement(
      'div',
      { className: 'dropdown', onBlur: this.onBlur, onKeyDown: this.onKeyDown, style: createStyleObject(width, height) },
      React.createElement(
        'button',
        { id: id, className: dropdownButtonClass, 'aria-label': ariaLabel, type: 'button', onClick: this.onDropdownClick, disabled: disabled },
        React.createElement(
          'div',
          { className: displayedValueClass },
          displayedValue
        ),
        !hideArrow && React.createElement('div', { className: arrowClass })
      ),
      React.createElement(
        'ul',
        { className: contentClass, style: listStyle },
        this.renderOptions()
      )
    );
  }
}

Dropdown.propTypes = {
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
  centerText: PropTypes.bool,
  disabled: PropTypes.bool,
  height: PropTypes.number,
  hideArrow: PropTypes.bool,
  id: PropTypes.string,
  maxContentHeight: PropTypes.number,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  selectedOption: PropTypes.string,
  setSelected: PropTypes.func.isRequired,
  width: PropTypes.number
};

Dropdown.defaultProps = {
  ariaLabel: null,
  className: '',
  centerText: false,
  disabled: false,
  height: null,
  hideArrow: false,
  id: '',
  maxContentHeight: null,
  placeholder: 'Select ...',
  selectedOption: null,
  width: null
};

module.exports = Dropdown;
