'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _classCallCheck = _interopDefault(require('@babel/runtime/helpers/classCallCheck'));
var _createClass = _interopDefault(require('@babel/runtime/helpers/createClass'));
var _possibleConstructorReturn = _interopDefault(require('@babel/runtime/helpers/possibleConstructorReturn'));
var _getPrototypeOf = _interopDefault(require('@babel/runtime/helpers/getPrototypeOf'));
var _assertThisInitialized = _interopDefault(require('@babel/runtime/helpers/assertThisInitialized'));
var _inherits = _interopDefault(require('@babel/runtime/helpers/inherits'));
var _defineProperty = _interopDefault(require('@babel/runtime/helpers/defineProperty'));
var emotion = require('emotion');
var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));

var KEY_CODES = {
  UP_ARROW: 38,
  DOWN_ARROW: 40,
  ENTER: 13,
  ESCAPE: 27,
  TAB: 9,
  PAGE_UP: 33,
  PAGE_DOWN: 34
};
var NAVIGATION_KEYS = [KEY_CODES.ESCAPE, KEY_CODES.UP_ARROW, KEY_CODES.DOWN_ARROW, KEY_CODES.PAGE_UP, KEY_CODES.PAGE_DOWN];

var colours = {
  greys: {
    lighter: '#d9dadd',
    light: '#b5b6b7',
    base: '#808080',
    dark: '#595959',
    darker: '#404040'
  },
  purple: {
    lighter: '#ccd1ed',
    light: '#a7aedf',
    base: '#990099'
  }
};

var optionItemStyle = function optionItemStyle(props, state, _ref) {
  var _ref$selected = _ref.selected,
      selected = _ref$selected === void 0 ? false : _ref$selected;
  return {
    fontSize: '0.95em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    padding: '5px 10px',
    width: '100%',
    textAlign: 'left',
    cursor: 'pointer',
    outline: 'none',
    backgroundColor: selected ? colours.purple.lighter : 'white',
    border: 'none',
    '&:hover': {
      backgroundColor: selected ? colours.purple.light : colours.greys.lighter
    },
    '&:focus': {
      backgroundColor: selected ? colours.purple.light : colours.greys.lighter
    },
    '.option-icon': {
      paddingRight: '5px'
    }
  };
};
var OptionItem = React__default.forwardRef(function (props, ref) {
  var onOptionClicked = props.onOptionClicked,
      option = props.option,
      optionClass = props.optionClass;
  return React__default.createElement("button", {
    "aria-label": option.ariaLabel,
    className: optionClass,
    onClick: onOptionClicked,
    onKeyDown: onOptionClicked,
    ref: ref,
    tabIndex: "-1",
    title: option.title,
    type: "button"
  }, option.iconClass && React__default.createElement("i", {
    className: "".concat(option.iconClass, " option-icon")
  }), option.value);
}); // Please Keep Alphabetical

OptionItem.propTypes = {
  ariaLabel: PropTypes.string,
  option: PropTypes.shape({
    ariaLabel: PropTypes.string,
    className: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.string.isRequired,
    iconClass: PropTypes.string
  }).isRequired,
  optionClass: PropTypes.string,
  onOptionClicked: PropTypes.func.isRequired
};
OptionItem.defaultProps = {
  ariaLabel: null,
  optionClass: null
};

function defaultOptionRenderer(selectedOption, options, selectedOptionClassName, optionClassName, onOptionClicked, elementsRef, getStyle) {
  return options.map(function (option) {
    var groupOptions = option.groupOptions,
        label = option.label,
        value = option.value,
        className = option.className;

    if (groupOptions) {
      // Is group of options
      return React__default.createElement("div", {
        key: label,
        className: getStyle('groupContainer')
      }, React__default.createElement("div", {
        className: getStyle('groupHeading')
      }, React__default.createElement("div", null, label.toUpperCase()), React__default.createElement("div", null, groupOptions.length)), option.groupOptions.map(function (groupOption) {
        var groupOptionClass = emotion.cx(groupOption.className, getStyle('optionItem', groupOption.value === selectedOption));

        return React__default.createElement(OptionItem, {
          key: groupOption.value,
          optionClass: groupOptionClass,
          onOptionClicked: onOptionClicked,
          option: groupOption,
          ref: function ref(el) {
            return el && elementsRef.push(el);
          }
        });
      }));
    }

    var optionClass = emotion.cx(className, getStyle('optionItem', {
      selected: value === selectedOption
    }));

    return React__default.createElement(OptionItem, {
      key: value,
      optionClass: optionClass,
      onOptionClicked: onOptionClicked,
      option: option,
      ref: function ref(el) {
        return el && elementsRef.push(el);
      }
    });
  });
}

var dropdownWrapper = function dropdownWrapper(_ref) {
  var width = _ref.width,
      height = _ref.height;
  return {
    width: width,
    height: height,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column'
  };
};

var dropdownButton = function dropdownButton(props, _ref2) {
  var open = _ref2.open;
  return {
    fontSize: '1em',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    padding: '9px 5px',
    margin: '0',
    borderRadius: '0',
    borderBottom: "2px solid ".concat(colours.greys.light),
    borderTop: 'none',
    borderRight: 'none',
    borderLeft: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    outline: 'none',
    boxShadow: open ? "0px 1px 3px 2px ".concat(colours.greys.lighter) : 'none',
    '&:hover': {
      boxShadow: "0px 1px 3px 2px ".concat(colours.greys.lighter)
    },
    '&:focus': {
      boxShadow: "0px 1px 3px 2px ".concat(colours.greys.lighter)
    },
    '&:disabled': {
      cursor: 'not-allowed'
    }
  };
};

var displayedValue = function displayedValue(_ref3, _ref4) {
  var hideArrow = _ref3.hideArrow,
      selectedOption = _ref3.selectedOption,
      centerText = _ref3.centerText;
  var internalSelectedOption = _ref4.internalSelectedOption;
  return {
    flex: '1',
    borderRight: hideArrow ? 'none' : "1px solid ".concat(colours.greys.light),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: selectedOption || internalSelectedOption ? 'black' : colours.greys.base,
    textAlign: centerText ? 'center' : 'left'
  };
};

var arrow = function arrow(props, _ref5) {
  var open = _ref5.open;
  return {
    content: '""',
    width: '0',
    height: '0',
    marginLeft: '8px',
    marginRight: '5px',
    borderRight: '5px solid transparent',
    borderLeft: '5px solid transparent',
    borderTop: open ? '0' : "5px solid ".concat(colours.greys.base),
    borderBottom: open ? "5px solid ".concat(colours.greys.base) : '0'
  };
};

var optionContainer = function optionContainer(_ref6, _ref7) {
  var openUp = _ref6.openUp,
      maxContentHeight = _ref6.maxContentHeight;
  var open = _ref7.open;
  return {
    width: '100%',
    maxHeight: maxContentHeight || '175px',
    overflowY: maxContentHeight ? 'scroll' : null,
    zIndex: '9999',
    overflowX: 'hidden',
    position: 'absolute',
    left: '0',
    listStyleType: 'none',
    margin: '0',
    padding: '2px 0',
    backgroundColor: 'white',
    color: 'black',
    borderRadius: '2px',
    display: open ? 'block' : 'none',
    boxSizing: 'border-box',
    top: openUp ? null : '100%',
    bottom: openUp ? '105%' : null,
    boxShadow: openUp ? "0px -3px 3px 2px ".concat(colours.greys.lighter) : "0px 3px 3px 2px ".concat(colours.greys.lighter),
    '&::-webkit-scrollbar': {
      width: '5px'
    },
    '&::-webkit-scrollbar-track': {
      background: '#ddd'
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#666'
    }
  };
};

var groupContainer = function groupContainer() {
  return {
    padding: '1em 0 0 0'
  };
};

var groupHeading = function groupHeading() {
  return {
    color: 'grey',
    fontSize: '0.9em',
    padding: '0 10px 3px 5px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  };
};

var defaultStyles = {
  arrow: arrow,
  dropdownButton: dropdownButton,
  displayedValue: displayedValue,
  dropdownWrapper: dropdownWrapper,
  groupContainer: groupContainer,
  groupHeading: groupHeading,
  optionContainer: optionContainer,
  optionItem: optionItemStyle
};

var Dropdown =
/*#__PURE__*/
function (_Component) {
  _inherits(Dropdown, _Component);

  function Dropdown(props) {
    var _this;

    _classCallCheck(this, Dropdown);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Dropdown).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onClick", function (e) {
      if (!_this.container.contains(e.target)) {
        _this.closeDropdown();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onDropdownClick", function (_ref) {
      var nativeEvent = _ref.nativeEvent;
      var disabled = _this.props.disabled;

      if (nativeEvent instanceof KeyboardEvent) {
        // eslint-disable-line no-undef
        if (nativeEvent.keyCode !== KEY_CODES.ENTER) return;
        nativeEvent.preventDefault();
      }

      if (!disabled) {
        _this.setState(function (p) {
          return {
            open: !p.open,
            focusedIndex: p.open ? -1 : p.focusedIndex
          };
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onOptionClicked", function (_ref2) {
      var nativeEvent = _ref2.nativeEvent;
      var setSelected = _this.props.setSelected;

      if (nativeEvent instanceof KeyboardEvent) {
        // eslint-disable-line no-undef
        if (nativeEvent.keyCode !== KEY_CODES.ENTER) return;
        nativeEvent.preventDefault();
      }

      var selectedOption = nativeEvent.target.innerText;
      setSelected(selectedOption);

      _this.setState({
        open: false,
        internalSelectedOption: selectedOption
      });

      if (nativeEvent.keyCode && nativeEvent.keyCode === KEY_CODES.ENTER) _this.button.focus();
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (_ref3) {
      var nativeEvent = _ref3.nativeEvent;
      var key = nativeEvent.key && nativeEvent.key.toLowerCase();
      var keyCode = nativeEvent.keyCode;
      var searchable = _this.props.searchable;

      if (NAVIGATION_KEYS.indexOf(keyCode) !== -1) {
        nativeEvent.preventDefault();

        _this.onNavigation(keyCode);
      } else if (keyCode === KEY_CODES.TAB) {
        _this.closeDropdown();
      } else if (key.length === 1 && searchable) {
        _this.searchDropdown(key);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onNavigation", function (keyCode) {
      var focusedIndex = _this.state.focusedIndex;
      var pageKeyTraverseSize = _this.props.pageKeyTraverseSize;

      switch (keyCode) {
        case KEY_CODES.UP_ARROW:
          if (focusedIndex === -1) {
            _this.setState({
              focusedIndex: 0
            }, _this.setFocus);
          } else if (focusedIndex === 0) {
            _this.setState({
              focusedIndex: _this.elements.length - 1
            }, _this.setFocus);
          } else {
            _this.setState(function (p) {
              return {
                focusedIndex: p.focusedIndex - 1
              };
            }, _this.setFocus);
          }

          break;

        case KEY_CODES.DOWN_ARROW:
          _this.setState(function (p) {
            return {
              focusedIndex: (p.focusedIndex + 1) % _this.elements.length
            };
          }, _this.setFocus);

          break;

        case KEY_CODES.PAGE_UP:
          if (focusedIndex === -1) {
            _this.setState({
              focusedIndex: 0
            }, _this.setFocus);
          } else if (focusedIndex - pageKeyTraverseSize < 0) {
            _this.setState({
              focusedIndex: _this.elements.length - 1
            }, _this.setFocus);
          } else {
            _this.setState(function (p) {
              return {
                focusedIndex: p.focusedIndex - pageKeyTraverseSize - 1
              };
            }, _this.setFocus);
          }

          break;

        case KEY_CODES.PAGE_DOWN:
          _this.setState(function (p) {
            return {
              focusedIndex: (p.focusedIndex + pageKeyTraverseSize - 1) % _this.elements.length
            };
          }, _this.setFocus);

          break;

        case KEY_CODES.ESCAPE:
          _this.closeDropdown(true);

          break;

        default:
          break;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getStyle", function (key, extraState) {
      var style = _this.props.style;
      var baseStyle = defaultStyles[key](_this.props, _this.state, extraState);
      var customStyle = style[key];
      return customStyle ?
      /*#__PURE__*/
      emotion.css(customStyle(baseStyle, _this.state, extraState), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRyb3Bkb3duLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF1SHlCIiwiZmlsZSI6IkRyb3Bkb3duLmpzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjc3MsIGN4IH0gZnJvbSAnZW1vdGlvbic7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgS0VZX0NPREVTLCBOQVZJR0FUSU9OX0tFWVMgfSBmcm9tICcuL3V0aWxzL2hlbHBlcic7XG5pbXBvcnQgZGVmYXVsdE9wdGlvblJlbmRlcmVyIGZyb20gJy4vdXRpbHMvZGVmYXVsdE9wdGlvblJlbmRlcmVyJztcbmltcG9ydCBkZWZhdWx0U3R5bGVzIGZyb20gJy4vc3R5bGVzL0Ryb3Bkb3duJztcblxuY2xhc3MgRHJvcGRvd24gZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgb3BlbjogZmFsc2UsXG4gICAgICBzZWFyY2hUZXJtOiAnJyxcbiAgICAgIHNlYXJjaFRpbWVyOiAtMSxcbiAgICAgIGZvY3VzZWRJbmRleDogLTEsXG4gICAgICBpbnRlcm5hbFNlbGVjdGVkT3B0aW9uOiBudWxsLFxuICAgIH07XG4gICAgdGhpcy5lbGVtZW50cyA9IFtdO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMub25DbGljaywgZmFsc2UpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLm9uQ2xpY2ssIGZhbHNlKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMub25DbGljayk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMub25DbGljayk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcbiAgfVxuXG4gIG9uQ2xpY2sgPSAoZSkgPT4ge1xuICAgIGlmICghdGhpcy5jb250YWluZXIuY29udGFpbnMoZS50YXJnZXQpKSB7XG4gICAgICB0aGlzLmNsb3NlRHJvcGRvd24oKTtcbiAgICB9XG4gIH1cblxuICBvbkRyb3Bkb3duQ2xpY2sgPSAoeyBuYXRpdmVFdmVudCB9KSA9PiB7XG4gICAgY29uc3QgeyBkaXNhYmxlZCB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmIChuYXRpdmVFdmVudCBpbnN0YW5jZW9mIEtleWJvYXJkRXZlbnQpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuICAgICAgaWYgKG5hdGl2ZUV2ZW50LmtleUNvZGUgIT09IEtFWV9DT0RFUy5FTlRFUikgcmV0dXJuO1xuICAgICAgbmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBpZiAoIWRpc2FibGVkKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHAgPT4gKHsgb3BlbjogIXAub3BlbiwgZm9jdXNlZEluZGV4OiBwLm9wZW4gPyAtMSA6IHAuZm9jdXNlZEluZGV4IH0pKTtcbiAgICB9XG4gIH1cblxuICBvbk9wdGlvbkNsaWNrZWQgPSAoeyBuYXRpdmVFdmVudCB9KSA9PiB7XG4gICAgY29uc3QgeyBzZXRTZWxlY3RlZCB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmIChuYXRpdmVFdmVudCBpbnN0YW5jZW9mIEtleWJvYXJkRXZlbnQpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuICAgICAgaWYgKG5hdGl2ZUV2ZW50LmtleUNvZGUgIT09IEtFWV9DT0RFUy5FTlRFUikgcmV0dXJuO1xuICAgICAgbmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBjb25zdCBzZWxlY3RlZE9wdGlvbiA9IG5hdGl2ZUV2ZW50LnRhcmdldC5pbm5lclRleHQ7XG4gICAgc2V0U2VsZWN0ZWQoc2VsZWN0ZWRPcHRpb24pO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBvcGVuOiBmYWxzZSwgaW50ZXJuYWxTZWxlY3RlZE9wdGlvbjogc2VsZWN0ZWRPcHRpb24gfSk7XG4gICAgaWYgKG5hdGl2ZUV2ZW50LmtleUNvZGUgJiYgbmF0aXZlRXZlbnQua2V5Q29kZSA9PT0gS0VZX0NPREVTLkVOVEVSKSB0aGlzLmJ1dHRvbi5mb2N1cygpO1xuICB9XG5cbiAgb25LZXlEb3duID0gKHsgbmF0aXZlRXZlbnQgfSkgPT4ge1xuICAgIGNvbnN0IGtleSA9IG5hdGl2ZUV2ZW50LmtleSAmJiBuYXRpdmVFdmVudC5rZXkudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCB7IGtleUNvZGUgfSA9IG5hdGl2ZUV2ZW50O1xuICAgIGNvbnN0IHsgc2VhcmNoYWJsZSB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmIChOQVZJR0FUSU9OX0tFWVMuaW5kZXhPZihrZXlDb2RlKSAhPT0gLTEpIHtcbiAgICAgIG5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLm9uTmF2aWdhdGlvbihrZXlDb2RlKTtcbiAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IEtFWV9DT0RFUy5UQUIpIHtcbiAgICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xuICAgIH0gZWxzZSBpZiAoa2V5Lmxlbmd0aCA9PT0gMSAmJiBzZWFyY2hhYmxlKSB7XG4gICAgICB0aGlzLnNlYXJjaERyb3Bkb3duKGtleSk7XG4gICAgfVxuICB9XG5cbiAgb25OYXZpZ2F0aW9uID0gKGtleUNvZGUpID0+IHtcbiAgICBjb25zdCB7IGZvY3VzZWRJbmRleCB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7IHBhZ2VLZXlUcmF2ZXJzZVNpemUgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBzd2l0Y2ggKGtleUNvZGUpIHtcbiAgICAgIGNhc2UgS0VZX0NPREVTLlVQX0FSUk9XOlxuICAgICAgICBpZiAoZm9jdXNlZEluZGV4ID09PSAtMSkge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBmb2N1c2VkSW5kZXg6IDAgfSwgdGhpcy5zZXRGb2N1cyk7XG4gICAgICAgIH0gZWxzZSBpZiAoZm9jdXNlZEluZGV4ID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGZvY3VzZWRJbmRleDogdGhpcy5lbGVtZW50cy5sZW5ndGggLSAxIH0sIHRoaXMuc2V0Rm9jdXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUocCA9PiAoeyBmb2N1c2VkSW5kZXg6IHAuZm9jdXNlZEluZGV4IC0gMSB9KSwgdGhpcy5zZXRGb2N1cyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEtFWV9DT0RFUy5ET1dOX0FSUk9XOlxuICAgICAgICB0aGlzLnNldFN0YXRlKHAgPT4gKHsgZm9jdXNlZEluZGV4OiAocC5mb2N1c2VkSW5kZXggKyAxKSAlIHRoaXMuZWxlbWVudHMubGVuZ3RoIH0pLCB0aGlzLnNldEZvY3VzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEtFWV9DT0RFUy5QQUdFX1VQOlxuICAgICAgICBpZiAoZm9jdXNlZEluZGV4ID09PSAtMSkge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBmb2N1c2VkSW5kZXg6IDAgfSwgdGhpcy5zZXRGb2N1cyk7XG4gICAgICAgIH0gZWxzZSBpZiAoZm9jdXNlZEluZGV4IC0gcGFnZUtleVRyYXZlcnNlU2l6ZSA8IDApIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgZm9jdXNlZEluZGV4OiB0aGlzLmVsZW1lbnRzLmxlbmd0aCAtIDEgfSwgdGhpcy5zZXRGb2N1cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZShwID0+ICh7IGZvY3VzZWRJbmRleDogcC5mb2N1c2VkSW5kZXggLSBwYWdlS2V5VHJhdmVyc2VTaXplIC0gMSB9KSwgdGhpcy5zZXRGb2N1cyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEtFWV9DT0RFUy5QQUdFX0RPV046XG4gICAgICAgIHRoaXMuc2V0U3RhdGUocCA9PiAoeyBmb2N1c2VkSW5kZXg6IChwLmZvY3VzZWRJbmRleCArIHBhZ2VLZXlUcmF2ZXJzZVNpemUgLSAxKSAlIHRoaXMuZWxlbWVudHMubGVuZ3RoIH0pLCB0aGlzLnNldEZvY3VzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEtFWV9DT0RFUy5FU0NBUEU6XG4gICAgICAgIHRoaXMuY2xvc2VEcm9wZG93bih0cnVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBnZXRTdHlsZSA9IChrZXksIGV4dHJhU3RhdGUpID0+IHtcbiAgICBjb25zdCB7IHN0eWxlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGJhc2VTdHlsZSA9IGRlZmF1bHRTdHlsZXNba2V5XSh0aGlzLnByb3BzLCB0aGlzLnN0YXRlLCBleHRyYVN0YXRlKTtcbiAgICBjb25zdCBjdXN0b21TdHlsZSA9IHN0eWxlW2tleV07XG4gICAgcmV0dXJuIGN1c3RvbVN0eWxlID8gY3NzKGN1c3RvbVN0eWxlKGJhc2VTdHlsZSwgdGhpcy5zdGF0ZSwgZXh0cmFTdGF0ZSkpIDogY3NzKGJhc2VTdHlsZSk7XG4gIH1cblxuICBzZXRGb2N1cyA9ICgpID0+IHtcbiAgICBjb25zdCB7IGZvY3VzZWRJbmRleCB9ID0gdGhpcy5zdGF0ZTtcbiAgICB0aGlzLmVsZW1lbnRzW2ZvY3VzZWRJbmRleF0uZm9jdXMoKTtcbiAgfVxuXG4gIGNsb3NlRHJvcGRvd24gPSAoZm9jdXMgPSBmYWxzZSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUocCA9PiAoeyBvcGVuOiBmYWxzZSwgZm9jdXNlZEluZGV4OiBwLmludGVybmFsU2VsZWN0ZWRPcHRpb24gPyBwLmZvY3VzZWRJbmRleCA6IC0xIH0pKTtcbiAgICBpZiAoZm9jdXMpIHtcbiAgICAgIHRoaXMuYnV0dG9uLmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgc2VhcmNoRHJvcGRvd24gPSAoa2V5KSA9PiB7XG4gICAgY29uc3QgeyBzZWFyY2hUZXJtIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IG9sZFRlcm0gPSBzZWFyY2hUZXJtO1xuICAgIHRoaXMuc2V0U3RhdGUocCA9PiAoeyBzZWFyY2hUZXJtOiBwLnNlYXJjaFRlcm0gKyBrZXkgfSkpO1xuICAgIHRoaXMuc2VhcmNoTGlzdChvbGRUZXJtICsga2V5KTtcblxuICAgIHRoaXMuY2xlYXJUaW1lcigpO1xuICAgIGNvbnN0IHRpbWVyID0gc2V0VGltZW91dCh0aGlzLmNsZWFyU2VhcmNoLCAxNTAwKTtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VhcmNoVGltZXI6IHRpbWVyIH0pO1xuICB9XG5cbiAgY2xlYXJUaW1lciA9ICgpID0+IHtcbiAgICBjb25zdCB7IHNlYXJjaFRpbWVyIH0gPSB0aGlzLnN0YXRlO1xuICAgIGlmIChzZWFyY2hUaW1lciAhPT0gLTEpIHtcbiAgICAgIGNsZWFyVGltZW91dChzZWFyY2hUaW1lcik7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgc2VhcmNoVGltZXI6IC0xIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNsZWFyU2VhcmNoID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWFyY2hUZXJtOiAnJyB9KTtcbiAgfVxuXG4gIHNlYXJjaExpc3QgPSAodmFsdWUpID0+IHtcbiAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5lbGVtZW50cy5maW5kKGVsID0+IGVsLmlubmVyVGV4dC50b0xvd2VyQ2FzZSgpLmluZGV4T2YodmFsdWUpID09PSAwKTtcbiAgICBpZiAoZWxlbWVudCkgZWxlbWVudC5mb2N1cygpO1xuICB9XG5cbiAgcmVuZGVyT3B0aW9ucyA9ICgpID0+IHtcbiAgICBjb25zdCB7IG9wdGlvblJlbmRlcmVyLCBzZWxlY3RlZE9wdGlvbiwgc2VsZWN0ZWRPcHRpb25DbGFzc05hbWUsIG9wdGlvbkNsYXNzTmFtZSwgb3B0aW9ucyB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IGludGVybmFsU2VsZWN0ZWRPcHRpb24gfSA9IHRoaXMuc3RhdGU7XG4gICAgdGhpcy5lbGVtZW50cyA9IFtdOyAvLyBSZXNldCByZWYgYXJyYXlcblxuICAgIGlmIChvcHRpb25SZW5kZXJlcikge1xuICAgICAgcmV0dXJuIG9wdGlvblJlbmRlcmVyKHNlbGVjdGVkT3B0aW9uIHx8IGludGVybmFsU2VsZWN0ZWRPcHRpb24sIG9wdGlvbnMsIHRoaXMub25PcHRpb25DbGlja2VkLCB0aGlzLmVsZW1lbnRzLCB0aGlzLmdldFN0eWxlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVmYXVsdE9wdGlvblJlbmRlcmVyKHNlbGVjdGVkT3B0aW9uLCBvcHRpb25zLCBzZWxlY3RlZE9wdGlvbkNsYXNzTmFtZSwgb3B0aW9uQ2xhc3NOYW1lLCB0aGlzLm9uT3B0aW9uQ2xpY2tlZCwgdGhpcy5lbGVtZW50cywgdGhpcy5nZXRTdHlsZSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgLy8gUGxlYXNlIEtlZXAgQWxwaGFiZXRpY2FsXG4gICAgY29uc3Qge1xuICAgICAgYXJpYURlc2NyaWJlZEJ5LFxuICAgICAgYXJpYUxhYmVsLFxuICAgICAgYXJpYUxhYmVsbGVkQnksXG4gICAgICBhcnJvd1JlbmRlcmVyLFxuICAgICAgY29udGVudENsYXNzTmFtZSxcbiAgICAgIGJ1dHRvbkNsYXNzTmFtZSxcbiAgICAgIGRpc2FibGVkLFxuICAgICAgaGlkZUFycm93LFxuICAgICAgaWQsXG4gICAgICBwbGFjZWhvbGRlcixcbiAgICAgIHNlbGVjdGVkT3B0aW9uLFxuICAgICAgc2VsZWN0ZWRWYWx1ZUNsYXNzTmFtZSxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHtcbiAgICAgIGludGVybmFsU2VsZWN0ZWRPcHRpb24sXG4gICAgICBvcGVuLFxuICAgIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgY29uc3QgZGlzcGxheWVkVmFsdWUgPSBzZWxlY3RlZE9wdGlvbiB8fCBpbnRlcm5hbFNlbGVjdGVkT3B0aW9uIHx8IHBsYWNlaG9sZGVyIHx8ICcnO1xuICAgIGNvbnN0IHdyYXBwZXJDbGFzcyA9IHRoaXMuZ2V0U3R5bGUoJ2Ryb3Bkb3duV3JhcHBlcicpO1xuICAgIGNvbnN0IGRyb3Bkb3duQnV0dG9uQ2xhc3MgPSBjeChidXR0b25DbGFzc05hbWUsIHRoaXMuZ2V0U3R5bGUoJ2Ryb3Bkb3duQnV0dG9uJykpO1xuICAgIGNvbnN0IGRpc3BsYXllZFZhbHVlQ2xhc3MgPSBjeChzZWxlY3RlZFZhbHVlQ2xhc3NOYW1lLCB0aGlzLmdldFN0eWxlKCdkaXNwbGF5ZWRWYWx1ZScpKTtcbiAgICBjb25zdCBjb250ZW50Q2xhc3MgPSBjeChjb250ZW50Q2xhc3NOYW1lLCB0aGlzLmdldFN0eWxlKCdvcHRpb25Db250YWluZXInKSk7XG4gICAgY29uc3QgYXJyb3dDbGFzcyA9IHRoaXMuZ2V0U3R5bGUoJ2Fycm93Jyk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e3dyYXBwZXJDbGFzc31cbiAgICAgICAgb25LZXlEb3duPXt0aGlzLm9uS2V5RG93bn1cbiAgICAgICAgcmVmPXtkaXYgPT4gdGhpcy5jb250YWluZXIgPSBkaXZ9XG4gICAgICA+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBhcmlhLWxhYmVsPXthcmlhTGFiZWx9XG4gICAgICAgICAgYXJpLWRlc2NyaWJlZGJ5PXthcmlhRGVzY3JpYmVkQnl9XG4gICAgICAgICAgYXJpYS1sYWJlbGxlZGJ5PXthcmlhTGFiZWxsZWRCeX1cbiAgICAgICAgICBjbGFzc05hbWU9e2Ryb3Bkb3duQnV0dG9uQ2xhc3N9XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIGlkPXtpZH1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uRHJvcGRvd25DbGlja31cbiAgICAgICAgICBvbktleURvd249e3RoaXMub25Ecm9wZG93bkNsaWNrfVxuICAgICAgICAgIHJlZj17YnRuID0+IHRoaXMuYnV0dG9uID0gYnRufVxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICA+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Rpc3BsYXllZFZhbHVlQ2xhc3N9PnsgZGlzcGxheWVkVmFsdWUgfTwvZGl2PlxuICAgICAgICAgIHsgIWhpZGVBcnJvdyAmJiAhYXJyb3dSZW5kZXJlciAmJiA8ZGl2IGNsYXNzTmFtZT17YXJyb3dDbGFzc30gLz4gfVxuICAgICAgICAgIHsgIWhpZGVBcnJvdyAmJiBhcnJvd1JlbmRlcmVyICYmIGFycm93UmVuZGVyZXIob3BlbikgfVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPHVsIGNsYXNzTmFtZT17Y29udGVudENsYXNzfT57IHRoaXMucmVuZGVyT3B0aW9ucygpIH08L3VsPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG4vLyBQbGVhc2UgS2VlcCBBbHBoYWJldGljYWxcbkRyb3Bkb3duLnByb3BUeXBlcyA9IHtcbiAgYXJpYURlc2NyaWJlZEJ5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICBhcmlhTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGFyaWFMYWJlbGxlZEJ5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICBhcnJvd1JlbmRlcmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgYnV0dG9uQ2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBjZW50ZXJUZXh0OiBQcm9wVHlwZXMuYm9vbCxcbiAgY29udGVudENsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICBoZWlnaHQ6IFByb3BUeXBlcy5udW1iZXIsXG4gIGhpZGVBcnJvdzogUHJvcFR5cGVzLmJvb2wsXG4gIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBvcHRpb25SZW5kZXJlcjogUHJvcFR5cGVzLmZ1bmMsXG4gIG1heENvbnRlbnRIZWlnaHQ6IFByb3BUeXBlcy5udW1iZXIsXG4gIG9wdGlvbnM6IFByb3BUeXBlcy5hcnJheSxcbiAgb3B0aW9uQ2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBvcGVuVXA6IFByb3BUeXBlcy5ib29sLFxuICBwYWdlS2V5VHJhdmVyc2VTaXplOiBQcm9wVHlwZXMubnVtYmVyLFxuICBwbGFjZWhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgc2VhcmNoYWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gIHNlbGVjdGVkT3B0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBzZWxlY3RlZE9wdGlvbkNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgc2VsZWN0ZWRWYWx1ZUNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgc2V0U2VsZWN0ZWQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIHN0eWxlOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGFycm93OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBkcm9wZG93bkJ1dHRvbjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZGlzcGxheWVkVmFsdWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGRyb3Bkb3duV3JhcHBlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZ3JvdXBDb250YWluZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIGdyb3VwSGVhZGluZzogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb3B0aW9uQ29udGFpbmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvcHRpb25JdGVtOiBQcm9wVHlwZXMuZnVuYyxcbiAgfSksXG4gIHdpZHRoOiBQcm9wVHlwZXMubnVtYmVyLFxufTtcblxuLy8gUGxlYXNlIEtlZXAgQWxwaGFiZXRpY2FsXG5Ecm9wZG93bi5kZWZhdWx0UHJvcHMgPSB7XG4gIGFyaWFEZXNjcmliZWRCeTogbnVsbCxcbiAgYXJpYUxhYmVsOiBudWxsLFxuICBhcmlhTGFiZWxsZWRCeTogbnVsbCxcbiAgYXJyb3dSZW5kZXJlcjogdW5kZWZpbmVkLFxuICBidXR0b25DbGFzc05hbWU6IHVuZGVmaW5lZCxcbiAgY2VudGVyVGV4dDogZmFsc2UsXG4gIGNvbnRlbnRDbGFzc05hbWU6IHVuZGVmaW5lZCxcbiAgZGlzYWJsZWQ6IGZhbHNlLFxuICBoZWlnaHQ6IG51bGwsXG4gIGhpZGVBcnJvdzogZmFsc2UsXG4gIGlkOiB1bmRlZmluZWQsXG4gIG9wZW5VcDogZmFsc2UsXG4gIG9wdGlvblJlbmRlcmVyOiB1bmRlZmluZWQsXG4gIG9wdGlvbnM6IFtdLFxuICBvcHRpb25DbGFzc05hbWU6IHVuZGVmaW5lZCxcbiAgbWF4Q29udGVudEhlaWdodDogbnVsbCxcbiAgcGFnZUtleVRyYXZlcnNlU2l6ZTogMTAsXG4gIHBsYWNlaG9sZGVyOiAnU2VsZWN0IC4uLicsXG4gIHNlYXJjaGFibGU6IHRydWUsXG4gIHNlbGVjdGVkT3B0aW9uOiBudWxsLFxuICBzZWxlY3RlZE9wdGlvbkNsYXNzTmFtZTogdW5kZWZpbmVkLFxuICBzZWxlY3RlZFZhbHVlQ2xhc3NOYW1lOiB1bmRlZmluZWQsXG4gIHN0eWxlOiB7fSxcbiAgd2lkdGg6IG51bGwsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBEcm9wZG93bjtcbiJdfQ== */") :
      /*#__PURE__*/
      emotion.css(baseStyle, process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRyb3Bkb3duLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF1SCtFIiwiZmlsZSI6IkRyb3Bkb3duLmpzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjc3MsIGN4IH0gZnJvbSAnZW1vdGlvbic7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgS0VZX0NPREVTLCBOQVZJR0FUSU9OX0tFWVMgfSBmcm9tICcuL3V0aWxzL2hlbHBlcic7XG5pbXBvcnQgZGVmYXVsdE9wdGlvblJlbmRlcmVyIGZyb20gJy4vdXRpbHMvZGVmYXVsdE9wdGlvblJlbmRlcmVyJztcbmltcG9ydCBkZWZhdWx0U3R5bGVzIGZyb20gJy4vc3R5bGVzL0Ryb3Bkb3duJztcblxuY2xhc3MgRHJvcGRvd24gZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgb3BlbjogZmFsc2UsXG4gICAgICBzZWFyY2hUZXJtOiAnJyxcbiAgICAgIHNlYXJjaFRpbWVyOiAtMSxcbiAgICAgIGZvY3VzZWRJbmRleDogLTEsXG4gICAgICBpbnRlcm5hbFNlbGVjdGVkT3B0aW9uOiBudWxsLFxuICAgIH07XG4gICAgdGhpcy5lbGVtZW50cyA9IFtdO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMub25DbGljaywgZmFsc2UpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLm9uQ2xpY2ssIGZhbHNlKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMub25DbGljayk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMub25DbGljayk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcbiAgfVxuXG4gIG9uQ2xpY2sgPSAoZSkgPT4ge1xuICAgIGlmICghdGhpcy5jb250YWluZXIuY29udGFpbnMoZS50YXJnZXQpKSB7XG4gICAgICB0aGlzLmNsb3NlRHJvcGRvd24oKTtcbiAgICB9XG4gIH1cblxuICBvbkRyb3Bkb3duQ2xpY2sgPSAoeyBuYXRpdmVFdmVudCB9KSA9PiB7XG4gICAgY29uc3QgeyBkaXNhYmxlZCB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmIChuYXRpdmVFdmVudCBpbnN0YW5jZW9mIEtleWJvYXJkRXZlbnQpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuICAgICAgaWYgKG5hdGl2ZUV2ZW50LmtleUNvZGUgIT09IEtFWV9DT0RFUy5FTlRFUikgcmV0dXJuO1xuICAgICAgbmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBpZiAoIWRpc2FibGVkKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHAgPT4gKHsgb3BlbjogIXAub3BlbiwgZm9jdXNlZEluZGV4OiBwLm9wZW4gPyAtMSA6IHAuZm9jdXNlZEluZGV4IH0pKTtcbiAgICB9XG4gIH1cblxuICBvbk9wdGlvbkNsaWNrZWQgPSAoeyBuYXRpdmVFdmVudCB9KSA9PiB7XG4gICAgY29uc3QgeyBzZXRTZWxlY3RlZCB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmIChuYXRpdmVFdmVudCBpbnN0YW5jZW9mIEtleWJvYXJkRXZlbnQpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuICAgICAgaWYgKG5hdGl2ZUV2ZW50LmtleUNvZGUgIT09IEtFWV9DT0RFUy5FTlRFUikgcmV0dXJuO1xuICAgICAgbmF0aXZlRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBjb25zdCBzZWxlY3RlZE9wdGlvbiA9IG5hdGl2ZUV2ZW50LnRhcmdldC5pbm5lclRleHQ7XG4gICAgc2V0U2VsZWN0ZWQoc2VsZWN0ZWRPcHRpb24pO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBvcGVuOiBmYWxzZSwgaW50ZXJuYWxTZWxlY3RlZE9wdGlvbjogc2VsZWN0ZWRPcHRpb24gfSk7XG4gICAgaWYgKG5hdGl2ZUV2ZW50LmtleUNvZGUgJiYgbmF0aXZlRXZlbnQua2V5Q29kZSA9PT0gS0VZX0NPREVTLkVOVEVSKSB0aGlzLmJ1dHRvbi5mb2N1cygpO1xuICB9XG5cbiAgb25LZXlEb3duID0gKHsgbmF0aXZlRXZlbnQgfSkgPT4ge1xuICAgIGNvbnN0IGtleSA9IG5hdGl2ZUV2ZW50LmtleSAmJiBuYXRpdmVFdmVudC5rZXkudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCB7IGtleUNvZGUgfSA9IG5hdGl2ZUV2ZW50O1xuICAgIGNvbnN0IHsgc2VhcmNoYWJsZSB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmIChOQVZJR0FUSU9OX0tFWVMuaW5kZXhPZihrZXlDb2RlKSAhPT0gLTEpIHtcbiAgICAgIG5hdGl2ZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLm9uTmF2aWdhdGlvbihrZXlDb2RlKTtcbiAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IEtFWV9DT0RFUy5UQUIpIHtcbiAgICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xuICAgIH0gZWxzZSBpZiAoa2V5Lmxlbmd0aCA9PT0gMSAmJiBzZWFyY2hhYmxlKSB7XG4gICAgICB0aGlzLnNlYXJjaERyb3Bkb3duKGtleSk7XG4gICAgfVxuICB9XG5cbiAgb25OYXZpZ2F0aW9uID0gKGtleUNvZGUpID0+IHtcbiAgICBjb25zdCB7IGZvY3VzZWRJbmRleCB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7IHBhZ2VLZXlUcmF2ZXJzZVNpemUgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBzd2l0Y2ggKGtleUNvZGUpIHtcbiAgICAgIGNhc2UgS0VZX0NPREVTLlVQX0FSUk9XOlxuICAgICAgICBpZiAoZm9jdXNlZEluZGV4ID09PSAtMSkge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBmb2N1c2VkSW5kZXg6IDAgfSwgdGhpcy5zZXRGb2N1cyk7XG4gICAgICAgIH0gZWxzZSBpZiAoZm9jdXNlZEluZGV4ID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGZvY3VzZWRJbmRleDogdGhpcy5lbGVtZW50cy5sZW5ndGggLSAxIH0sIHRoaXMuc2V0Rm9jdXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUocCA9PiAoeyBmb2N1c2VkSW5kZXg6IHAuZm9jdXNlZEluZGV4IC0gMSB9KSwgdGhpcy5zZXRGb2N1cyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEtFWV9DT0RFUy5ET1dOX0FSUk9XOlxuICAgICAgICB0aGlzLnNldFN0YXRlKHAgPT4gKHsgZm9jdXNlZEluZGV4OiAocC5mb2N1c2VkSW5kZXggKyAxKSAlIHRoaXMuZWxlbWVudHMubGVuZ3RoIH0pLCB0aGlzLnNldEZvY3VzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEtFWV9DT0RFUy5QQUdFX1VQOlxuICAgICAgICBpZiAoZm9jdXNlZEluZGV4ID09PSAtMSkge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBmb2N1c2VkSW5kZXg6IDAgfSwgdGhpcy5zZXRGb2N1cyk7XG4gICAgICAgIH0gZWxzZSBpZiAoZm9jdXNlZEluZGV4IC0gcGFnZUtleVRyYXZlcnNlU2l6ZSA8IDApIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgZm9jdXNlZEluZGV4OiB0aGlzLmVsZW1lbnRzLmxlbmd0aCAtIDEgfSwgdGhpcy5zZXRGb2N1cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZShwID0+ICh7IGZvY3VzZWRJbmRleDogcC5mb2N1c2VkSW5kZXggLSBwYWdlS2V5VHJhdmVyc2VTaXplIC0gMSB9KSwgdGhpcy5zZXRGb2N1cyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEtFWV9DT0RFUy5QQUdFX0RPV046XG4gICAgICAgIHRoaXMuc2V0U3RhdGUocCA9PiAoeyBmb2N1c2VkSW5kZXg6IChwLmZvY3VzZWRJbmRleCArIHBhZ2VLZXlUcmF2ZXJzZVNpemUgLSAxKSAlIHRoaXMuZWxlbWVudHMubGVuZ3RoIH0pLCB0aGlzLnNldEZvY3VzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEtFWV9DT0RFUy5FU0NBUEU6XG4gICAgICAgIHRoaXMuY2xvc2VEcm9wZG93bih0cnVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBnZXRTdHlsZSA9IChrZXksIGV4dHJhU3RhdGUpID0+IHtcbiAgICBjb25zdCB7IHN0eWxlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGJhc2VTdHlsZSA9IGRlZmF1bHRTdHlsZXNba2V5XSh0aGlzLnByb3BzLCB0aGlzLnN0YXRlLCBleHRyYVN0YXRlKTtcbiAgICBjb25zdCBjdXN0b21TdHlsZSA9IHN0eWxlW2tleV07XG4gICAgcmV0dXJuIGN1c3RvbVN0eWxlID8gY3NzKGN1c3RvbVN0eWxlKGJhc2VTdHlsZSwgdGhpcy5zdGF0ZSwgZXh0cmFTdGF0ZSkpIDogY3NzKGJhc2VTdHlsZSk7XG4gIH1cblxuICBzZXRGb2N1cyA9ICgpID0+IHtcbiAgICBjb25zdCB7IGZvY3VzZWRJbmRleCB9ID0gdGhpcy5zdGF0ZTtcbiAgICB0aGlzLmVsZW1lbnRzW2ZvY3VzZWRJbmRleF0uZm9jdXMoKTtcbiAgfVxuXG4gIGNsb3NlRHJvcGRvd24gPSAoZm9jdXMgPSBmYWxzZSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUocCA9PiAoeyBvcGVuOiBmYWxzZSwgZm9jdXNlZEluZGV4OiBwLmludGVybmFsU2VsZWN0ZWRPcHRpb24gPyBwLmZvY3VzZWRJbmRleCA6IC0xIH0pKTtcbiAgICBpZiAoZm9jdXMpIHtcbiAgICAgIHRoaXMuYnV0dG9uLmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgc2VhcmNoRHJvcGRvd24gPSAoa2V5KSA9PiB7XG4gICAgY29uc3QgeyBzZWFyY2hUZXJtIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IG9sZFRlcm0gPSBzZWFyY2hUZXJtO1xuICAgIHRoaXMuc2V0U3RhdGUocCA9PiAoeyBzZWFyY2hUZXJtOiBwLnNlYXJjaFRlcm0gKyBrZXkgfSkpO1xuICAgIHRoaXMuc2VhcmNoTGlzdChvbGRUZXJtICsga2V5KTtcblxuICAgIHRoaXMuY2xlYXJUaW1lcigpO1xuICAgIGNvbnN0IHRpbWVyID0gc2V0VGltZW91dCh0aGlzLmNsZWFyU2VhcmNoLCAxNTAwKTtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VhcmNoVGltZXI6IHRpbWVyIH0pO1xuICB9XG5cbiAgY2xlYXJUaW1lciA9ICgpID0+IHtcbiAgICBjb25zdCB7IHNlYXJjaFRpbWVyIH0gPSB0aGlzLnN0YXRlO1xuICAgIGlmIChzZWFyY2hUaW1lciAhPT0gLTEpIHtcbiAgICAgIGNsZWFyVGltZW91dChzZWFyY2hUaW1lcik7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgc2VhcmNoVGltZXI6IC0xIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNsZWFyU2VhcmNoID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWFyY2hUZXJtOiAnJyB9KTtcbiAgfVxuXG4gIHNlYXJjaExpc3QgPSAodmFsdWUpID0+IHtcbiAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5lbGVtZW50cy5maW5kKGVsID0+IGVsLmlubmVyVGV4dC50b0xvd2VyQ2FzZSgpLmluZGV4T2YodmFsdWUpID09PSAwKTtcbiAgICBpZiAoZWxlbWVudCkgZWxlbWVudC5mb2N1cygpO1xuICB9XG5cbiAgcmVuZGVyT3B0aW9ucyA9ICgpID0+IHtcbiAgICBjb25zdCB7IG9wdGlvblJlbmRlcmVyLCBzZWxlY3RlZE9wdGlvbiwgc2VsZWN0ZWRPcHRpb25DbGFzc05hbWUsIG9wdGlvbkNsYXNzTmFtZSwgb3B0aW9ucyB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IGludGVybmFsU2VsZWN0ZWRPcHRpb24gfSA9IHRoaXMuc3RhdGU7XG4gICAgdGhpcy5lbGVtZW50cyA9IFtdOyAvLyBSZXNldCByZWYgYXJyYXlcblxuICAgIGlmIChvcHRpb25SZW5kZXJlcikge1xuICAgICAgcmV0dXJuIG9wdGlvblJlbmRlcmVyKHNlbGVjdGVkT3B0aW9uIHx8IGludGVybmFsU2VsZWN0ZWRPcHRpb24sIG9wdGlvbnMsIHRoaXMub25PcHRpb25DbGlja2VkLCB0aGlzLmVsZW1lbnRzLCB0aGlzLmdldFN0eWxlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVmYXVsdE9wdGlvblJlbmRlcmVyKHNlbGVjdGVkT3B0aW9uLCBvcHRpb25zLCBzZWxlY3RlZE9wdGlvbkNsYXNzTmFtZSwgb3B0aW9uQ2xhc3NOYW1lLCB0aGlzLm9uT3B0aW9uQ2xpY2tlZCwgdGhpcy5lbGVtZW50cywgdGhpcy5nZXRTdHlsZSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgLy8gUGxlYXNlIEtlZXAgQWxwaGFiZXRpY2FsXG4gICAgY29uc3Qge1xuICAgICAgYXJpYURlc2NyaWJlZEJ5LFxuICAgICAgYXJpYUxhYmVsLFxuICAgICAgYXJpYUxhYmVsbGVkQnksXG4gICAgICBhcnJvd1JlbmRlcmVyLFxuICAgICAgY29udGVudENsYXNzTmFtZSxcbiAgICAgIGJ1dHRvbkNsYXNzTmFtZSxcbiAgICAgIGRpc2FibGVkLFxuICAgICAgaGlkZUFycm93LFxuICAgICAgaWQsXG4gICAgICBwbGFjZWhvbGRlcixcbiAgICAgIHNlbGVjdGVkT3B0aW9uLFxuICAgICAgc2VsZWN0ZWRWYWx1ZUNsYXNzTmFtZSxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHtcbiAgICAgIGludGVybmFsU2VsZWN0ZWRPcHRpb24sXG4gICAgICBvcGVuLFxuICAgIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgY29uc3QgZGlzcGxheWVkVmFsdWUgPSBzZWxlY3RlZE9wdGlvbiB8fCBpbnRlcm5hbFNlbGVjdGVkT3B0aW9uIHx8IHBsYWNlaG9sZGVyIHx8ICcnO1xuICAgIGNvbnN0IHdyYXBwZXJDbGFzcyA9IHRoaXMuZ2V0U3R5bGUoJ2Ryb3Bkb3duV3JhcHBlcicpO1xuICAgIGNvbnN0IGRyb3Bkb3duQnV0dG9uQ2xhc3MgPSBjeChidXR0b25DbGFzc05hbWUsIHRoaXMuZ2V0U3R5bGUoJ2Ryb3Bkb3duQnV0dG9uJykpO1xuICAgIGNvbnN0IGRpc3BsYXllZFZhbHVlQ2xhc3MgPSBjeChzZWxlY3RlZFZhbHVlQ2xhc3NOYW1lLCB0aGlzLmdldFN0eWxlKCdkaXNwbGF5ZWRWYWx1ZScpKTtcbiAgICBjb25zdCBjb250ZW50Q2xhc3MgPSBjeChjb250ZW50Q2xhc3NOYW1lLCB0aGlzLmdldFN0eWxlKCdvcHRpb25Db250YWluZXInKSk7XG4gICAgY29uc3QgYXJyb3dDbGFzcyA9IHRoaXMuZ2V0U3R5bGUoJ2Fycm93Jyk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e3dyYXBwZXJDbGFzc31cbiAgICAgICAgb25LZXlEb3duPXt0aGlzLm9uS2V5RG93bn1cbiAgICAgICAgcmVmPXtkaXYgPT4gdGhpcy5jb250YWluZXIgPSBkaXZ9XG4gICAgICA+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBhcmlhLWxhYmVsPXthcmlhTGFiZWx9XG4gICAgICAgICAgYXJpLWRlc2NyaWJlZGJ5PXthcmlhRGVzY3JpYmVkQnl9XG4gICAgICAgICAgYXJpYS1sYWJlbGxlZGJ5PXthcmlhTGFiZWxsZWRCeX1cbiAgICAgICAgICBjbGFzc05hbWU9e2Ryb3Bkb3duQnV0dG9uQ2xhc3N9XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIGlkPXtpZH1cbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLm9uRHJvcGRvd25DbGlja31cbiAgICAgICAgICBvbktleURvd249e3RoaXMub25Ecm9wZG93bkNsaWNrfVxuICAgICAgICAgIHJlZj17YnRuID0+IHRoaXMuYnV0dG9uID0gYnRufVxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICA+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Rpc3BsYXllZFZhbHVlQ2xhc3N9PnsgZGlzcGxheWVkVmFsdWUgfTwvZGl2PlxuICAgICAgICAgIHsgIWhpZGVBcnJvdyAmJiAhYXJyb3dSZW5kZXJlciAmJiA8ZGl2IGNsYXNzTmFtZT17YXJyb3dDbGFzc30gLz4gfVxuICAgICAgICAgIHsgIWhpZGVBcnJvdyAmJiBhcnJvd1JlbmRlcmVyICYmIGFycm93UmVuZGVyZXIob3BlbikgfVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPHVsIGNsYXNzTmFtZT17Y29udGVudENsYXNzfT57IHRoaXMucmVuZGVyT3B0aW9ucygpIH08L3VsPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG4vLyBQbGVhc2UgS2VlcCBBbHBoYWJldGljYWxcbkRyb3Bkb3duLnByb3BUeXBlcyA9IHtcbiAgYXJpYURlc2NyaWJlZEJ5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICBhcmlhTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGFyaWFMYWJlbGxlZEJ5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICBhcnJvd1JlbmRlcmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgYnV0dG9uQ2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBjZW50ZXJUZXh0OiBQcm9wVHlwZXMuYm9vbCxcbiAgY29udGVudENsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICBoZWlnaHQ6IFByb3BUeXBlcy5udW1iZXIsXG4gIGhpZGVBcnJvdzogUHJvcFR5cGVzLmJvb2wsXG4gIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBvcHRpb25SZW5kZXJlcjogUHJvcFR5cGVzLmZ1bmMsXG4gIG1heENvbnRlbnRIZWlnaHQ6IFByb3BUeXBlcy5udW1iZXIsXG4gIG9wdGlvbnM6IFByb3BUeXBlcy5hcnJheSxcbiAgb3B0aW9uQ2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBvcGVuVXA6IFByb3BUeXBlcy5ib29sLFxuICBwYWdlS2V5VHJhdmVyc2VTaXplOiBQcm9wVHlwZXMubnVtYmVyLFxuICBwbGFjZWhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgc2VhcmNoYWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gIHNlbGVjdGVkT3B0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBzZWxlY3RlZE9wdGlvbkNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgc2VsZWN0ZWRWYWx1ZUNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgc2V0U2VsZWN0ZWQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIHN0eWxlOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGFycm93OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBkcm9wZG93bkJ1dHRvbjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZGlzcGxheWVkVmFsdWU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGRyb3Bkb3duV3JhcHBlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZ3JvdXBDb250YWluZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIGdyb3VwSGVhZGluZzogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb3B0aW9uQ29udGFpbmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvcHRpb25JdGVtOiBQcm9wVHlwZXMuZnVuYyxcbiAgfSksXG4gIHdpZHRoOiBQcm9wVHlwZXMubnVtYmVyLFxufTtcblxuLy8gUGxlYXNlIEtlZXAgQWxwaGFiZXRpY2FsXG5Ecm9wZG93bi5kZWZhdWx0UHJvcHMgPSB7XG4gIGFyaWFEZXNjcmliZWRCeTogbnVsbCxcbiAgYXJpYUxhYmVsOiBudWxsLFxuICBhcmlhTGFiZWxsZWRCeTogbnVsbCxcbiAgYXJyb3dSZW5kZXJlcjogdW5kZWZpbmVkLFxuICBidXR0b25DbGFzc05hbWU6IHVuZGVmaW5lZCxcbiAgY2VudGVyVGV4dDogZmFsc2UsXG4gIGNvbnRlbnRDbGFzc05hbWU6IHVuZGVmaW5lZCxcbiAgZGlzYWJsZWQ6IGZhbHNlLFxuICBoZWlnaHQ6IG51bGwsXG4gIGhpZGVBcnJvdzogZmFsc2UsXG4gIGlkOiB1bmRlZmluZWQsXG4gIG9wZW5VcDogZmFsc2UsXG4gIG9wdGlvblJlbmRlcmVyOiB1bmRlZmluZWQsXG4gIG9wdGlvbnM6IFtdLFxuICBvcHRpb25DbGFzc05hbWU6IHVuZGVmaW5lZCxcbiAgbWF4Q29udGVudEhlaWdodDogbnVsbCxcbiAgcGFnZUtleVRyYXZlcnNlU2l6ZTogMTAsXG4gIHBsYWNlaG9sZGVyOiAnU2VsZWN0IC4uLicsXG4gIHNlYXJjaGFibGU6IHRydWUsXG4gIHNlbGVjdGVkT3B0aW9uOiBudWxsLFxuICBzZWxlY3RlZE9wdGlvbkNsYXNzTmFtZTogdW5kZWZpbmVkLFxuICBzZWxlY3RlZFZhbHVlQ2xhc3NOYW1lOiB1bmRlZmluZWQsXG4gIHN0eWxlOiB7fSxcbiAgd2lkdGg6IG51bGwsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBEcm9wZG93bjtcbiJdfQ== */");
    });

    _defineProperty(_assertThisInitialized(_this), "setFocus", function () {
      var focusedIndex = _this.state.focusedIndex;

      _this.elements[focusedIndex].focus();
    });

    _defineProperty(_assertThisInitialized(_this), "closeDropdown", function () {
      var focus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      _this.setState(function (p) {
        return {
          open: false,
          focusedIndex: p.internalSelectedOption ? p.focusedIndex : -1
        };
      });

      if (focus) {
        _this.button.focus();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "searchDropdown", function (key) {
      var searchTerm = _this.state.searchTerm;
      var oldTerm = searchTerm;

      _this.setState(function (p) {
        return {
          searchTerm: p.searchTerm + key
        };
      });

      _this.searchList(oldTerm + key);

      _this.clearTimer();

      var timer = setTimeout(_this.clearSearch, 1500);

      _this.setState({
        searchTimer: timer
      });
    });

    _defineProperty(_assertThisInitialized(_this), "clearTimer", function () {
      var searchTimer = _this.state.searchTimer;

      if (searchTimer !== -1) {
        clearTimeout(searchTimer);

        _this.setState({
          searchTimer: -1
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "clearSearch", function () {
      _this.setState({
        searchTerm: ''
      });
    });

    _defineProperty(_assertThisInitialized(_this), "searchList", function (value) {
      var element = _this.elements.find(function (el) {
        return el.innerText.toLowerCase().indexOf(value) === 0;
      });

      if (element) element.focus();
    });

    _defineProperty(_assertThisInitialized(_this), "renderOptions", function () {
      var _this$props = _this.props,
          optionRenderer = _this$props.optionRenderer,
          selectedOption = _this$props.selectedOption,
          selectedOptionClassName = _this$props.selectedOptionClassName,
          optionClassName = _this$props.optionClassName,
          options = _this$props.options;
      var internalSelectedOption = _this.state.internalSelectedOption;
      _this.elements = []; // Reset ref array

      if (optionRenderer) {
        return optionRenderer(selectedOption || internalSelectedOption, options, _this.onOptionClicked, _this.elements, _this.getStyle);
      }

      return defaultOptionRenderer(selectedOption, options, selectedOptionClassName, optionClassName, _this.onOptionClicked, _this.elements, _this.getStyle);
    });

    _this.state = {
      open: false,
      searchTerm: '',
      searchTimer: -1,
      focusedIndex: -1,
      internalSelectedOption: null
    };
    _this.elements = [];
    return _this;
  }

  _createClass(Dropdown, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener('mouseup', this.onClick, false); // eslint-disable-line no-undef

      document.addEventListener('touchend', this.onClick, false); // eslint-disable-line no-undef
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('mouseup', this.onClick); // eslint-disable-line no-undef

      document.removeEventListener('touchend', this.onClick); // eslint-disable-line no-undef
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      // Please Keep Alphabetical
      var _this$props2 = this.props,
          ariaDescribedBy = _this$props2.ariaDescribedBy,
          ariaLabel = _this$props2.ariaLabel,
          ariaLabelledBy = _this$props2.ariaLabelledBy,
          arrowRenderer = _this$props2.arrowRenderer,
          contentClassName = _this$props2.contentClassName,
          buttonClassName = _this$props2.buttonClassName,
          disabled = _this$props2.disabled,
          hideArrow = _this$props2.hideArrow,
          id = _this$props2.id,
          placeholder = _this$props2.placeholder,
          selectedOption = _this$props2.selectedOption,
          selectedValueClassName = _this$props2.selectedValueClassName;
      var _this$state = this.state,
          internalSelectedOption = _this$state.internalSelectedOption,
          open = _this$state.open;
      var displayedValue = selectedOption || internalSelectedOption || placeholder || '';
      var wrapperClass = this.getStyle('dropdownWrapper');

      var dropdownButtonClass = emotion.cx(buttonClassName, this.getStyle('dropdownButton'));

      var displayedValueClass = emotion.cx(selectedValueClassName, this.getStyle('displayedValue'));

      var contentClass = emotion.cx(contentClassName, this.getStyle('optionContainer'));

      var arrowClass = this.getStyle('arrow');
      return React__default.createElement("div", {
        className: wrapperClass,
        onKeyDown: this.onKeyDown,
        ref: function ref(div) {
          return _this2.container = div;
        }
      }, React__default.createElement("button", {
        "aria-label": ariaLabel,
        "ari-describedby": ariaDescribedBy,
        "aria-labelledby": ariaLabelledBy,
        className: dropdownButtonClass,
        disabled: disabled,
        id: id,
        onClick: this.onDropdownClick,
        onKeyDown: this.onDropdownClick,
        ref: function ref(btn) {
          return _this2.button = btn;
        },
        type: "button"
      }, React__default.createElement("div", {
        className: displayedValueClass
      }, displayedValue), !hideArrow && !arrowRenderer && React__default.createElement("div", {
        className: arrowClass
      }), !hideArrow && arrowRenderer && arrowRenderer(open)), React__default.createElement("ul", {
        className: contentClass
      }, this.renderOptions()));
    }
  }]);

  return Dropdown;
}(React.Component); // Please Keep Alphabetical


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
    arrow: PropTypes.func,
    dropdownButton: PropTypes.func,
    displayedValue: PropTypes.func,
    dropdownWrapper: PropTypes.func,
    groupContainer: PropTypes.func,
    groupHeading: PropTypes.func,
    optionContainer: PropTypes.func,
    optionItem: PropTypes.func
  }),
  width: PropTypes.number
}; // Please Keep Alphabetical

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
  width: null
};

exports.default = Dropdown;
