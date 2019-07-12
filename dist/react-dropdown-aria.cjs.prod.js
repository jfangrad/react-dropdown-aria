"use strict";

function _interopDefault(ex) {
  return ex && "object" == typeof ex && "default" in ex ? ex.default : ex;
}

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _classCallCheck = _interopDefault(require("@babel/runtime/helpers/classCallCheck")), _createClass = _interopDefault(require("@babel/runtime/helpers/createClass")), _possibleConstructorReturn = _interopDefault(require("@babel/runtime/helpers/possibleConstructorReturn")), _getPrototypeOf = _interopDefault(require("@babel/runtime/helpers/getPrototypeOf")), _assertThisInitialized = _interopDefault(require("@babel/runtime/helpers/assertThisInitialized")), _inherits = _interopDefault(require("@babel/runtime/helpers/inherits")), _defineProperty = _interopDefault(require("@babel/runtime/helpers/defineProperty")), emotion = require("emotion"), React = require("react"), React__default = _interopDefault(React), PropTypes = _interopDefault(require("prop-types")), KEY_CODES = {
  UP_ARROW: 38,
  DOWN_ARROW: 40,
  ENTER: 13,
  ESCAPE: 27,
  TAB: 9,
  PAGE_UP: 33,
  PAGE_DOWN: 34
}, NAVIGATION_KEYS = [ KEY_CODES.ESCAPE, KEY_CODES.UP_ARROW, KEY_CODES.DOWN_ARROW, KEY_CODES.PAGE_UP, KEY_CODES.PAGE_DOWN ], colours = {
  greys: {
    lighter: "#d9dadd",
    light: "#b5b6b7",
    base: "#808080",
    dark: "#595959",
    darker: "#404040"
  },
  purple: {
    lighter: "#ccd1ed",
    light: "#a7aedf",
    base: "#990099"
  }
}, optionItemStyle = function(props, state, _ref) {
  var _ref$selected = _ref.selected, selected = void 0 !== _ref$selected && _ref$selected;
  return {
    fontSize: "0.95em",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    padding: "5px 10px",
    width: "100%",
    textAlign: "left",
    cursor: "pointer",
    outline: "none",
    backgroundColor: selected ? colours.purple.lighter : "white",
    border: "none",
    "&:hover": {
      backgroundColor: selected ? colours.purple.light : colours.greys.lighter
    },
    "&:focus": {
      backgroundColor: selected ? colours.purple.light : colours.greys.lighter
    },
    ".option-icon": {
      paddingRight: "5px"
    }
  };
}, OptionItem = React__default.forwardRef(function(props, ref) {
  var onOptionClicked = props.onOptionClicked, option = props.option, optionClass = props.optionClass;
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
});

function defaultOptionRenderer(selectedOption, options, selectedOptionClassName, optionClassName, onOptionClicked, elementsRef, getStyle) {
  return options.map(function(option) {
    var groupOptions = option.groupOptions, label = option.label, value = option.value, className = option.className;
    if (groupOptions) return React__default.createElement("div", {
      key: label,
      className: getStyle("groupContainer")
    }, React__default.createElement("div", {
      className: getStyle("groupHeading")
    }, React__default.createElement("div", null, label.toUpperCase()), React__default.createElement("div", null, groupOptions.length)), option.groupOptions.map(function(groupOption) {
      var groupOptionClass = emotion.cx(groupOption.className, getStyle("optionItem", groupOption.value === selectedOption));
      return React__default.createElement(OptionItem, {
        key: groupOption.value,
        optionClass: groupOptionClass,
        onOptionClicked: onOptionClicked,
        option: groupOption,
        ref: function(el) {
          return el && elementsRef.push(el);
        }
      });
    }));
    var optionClass = emotion.cx(className, getStyle("optionItem", {
      selected: value === selectedOption
    }));
    return React__default.createElement(OptionItem, {
      key: value,
      optionClass: optionClass,
      onOptionClicked: onOptionClicked,
      option: option,
      ref: function(el) {
        return el && elementsRef.push(el);
      }
    });
  });
}

OptionItem.propTypes = {
  ariaLabel: PropTypes.string,
  option: PropTypes.shape({
    ariaLabel: PropTypes.string,
    className: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.string.isRequired
  }).isRequired,
  optionClass: PropTypes.string
};

var dropdownWrapper = function(_ref) {
  return {
    width: _ref.width,
    height: _ref.height,
    position: "relative",
    display: "flex",
    flexDirection: "column"
  };
}, dropdownButton = function(props, _ref2) {
  var open = _ref2.open;
  return {
    fontSize: "1em",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    padding: "9px 5px",
    margin: "0",
    borderRadius: "0",
    borderBottom: "2px solid ".concat(colours.greys.light),
    borderTop: "none",
    borderRight: "none",
    borderLeft: "none",
    textAlign: "left",
    cursor: "pointer",
    outline: "none",
    boxShadow: open ? "0px 1px 3px 2px ".concat(colours.greys.lighter) : "none",
    "&:hover": {
      boxShadow: "0px 1px 3px 2px ".concat(colours.greys.lighter)
    },
    "&:focus": {
      boxShadow: "0px 1px 3px 2px ".concat(colours.greys.lighter)
    },
    "&:disabled": {
      cursor: "not-allowed"
    }
  };
}, displayedValue = function(_ref3, _ref4) {
  var hideArrow = _ref3.hideArrow, selectedOption = _ref3.selectedOption, centerText = _ref3.centerText, internalSelectedOption = _ref4.internalSelectedOption;
  return {
    flex: "1",
    borderRight: hideArrow ? "none" : "1px solid ".concat(colours.greys.light),
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    color: selectedOption || internalSelectedOption ? "black" : colours.greys.base,
    textAlign: centerText ? "center" : "left"
  };
}, arrow = function(props, _ref5) {
  var open = _ref5.open;
  return {
    content: '""',
    width: "0",
    height: "0",
    marginLeft: "8px",
    marginRight: "5px",
    borderRight: "5px solid transparent",
    borderLeft: "5px solid transparent",
    borderTop: open ? "0" : "5px solid ".concat(colours.greys.base),
    borderBottom: open ? "5px solid ".concat(colours.greys.base) : "0"
  };
}, optionContainer = function(_ref6, _ref7) {
  var openUp = _ref6.openUp, maxContentHeight = _ref6.maxContentHeight;
  return {
    width: "100%",
    maxHeight: maxContentHeight || "175px",
    overflowY: maxContentHeight ? "scroll" : null,
    zIndex: "9999",
    overflowX: "hidden",
    position: "absolute",
    left: "0",
    listStyleType: "none",
    margin: "0",
    padding: "2px 0",
    backgroundColor: "white",
    color: "black",
    borderRadius: "2px",
    display: _ref7.open ? "block" : "none",
    boxSizing: "border-box",
    top: openUp ? null : "100%",
    bottom: openUp ? "105%" : null,
    boxShadow: openUp ? "0px -3px 3px 2px ".concat(colours.greys.lighter) : "0px 3px 3px 2px ".concat(colours.greys.lighter),
    "&::-webkit-scrollbar": {
      width: "5px"
    },
    "&::-webkit-scrollbar-track": {
      background: "#ddd"
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#666"
    }
  };
}, groupContainer = function() {
  return {
    padding: "1em 0 0 0"
  };
}, groupHeading = function() {
  return {
    color: "grey",
    fontSize: "0.9em",
    padding: "0 10px 3px 5px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  };
}, defaultStyles = {
  arrow: arrow,
  dropdownButton: dropdownButton,
  displayedValue: displayedValue,
  dropdownWrapper: dropdownWrapper,
  groupContainer: groupContainer,
  groupHeading: groupHeading,
  optionContainer: optionContainer,
  optionItem: optionItemStyle
}, Dropdown = function(_Component) {
  function Dropdown(props) {
    var _this;
    return _classCallCheck(this, Dropdown), _this = _possibleConstructorReturn(this, _getPrototypeOf(Dropdown).call(this, props)), 
    _defineProperty(_assertThisInitialized(_this), "onClick", function(e) {
      _this.container.contains(e.target) || _this.closeDropdown();
    }), _defineProperty(_assertThisInitialized(_this), "onDropdownClick", function(_ref) {
      var nativeEvent = _ref.nativeEvent, disabled = _this.props.disabled;
      if (nativeEvent instanceof KeyboardEvent) {
        if (nativeEvent.keyCode !== KEY_CODES.ENTER) return;
        nativeEvent.preventDefault();
      }
      disabled || _this.setState(function(p) {
        return {
          open: !p.open,
          focusedIndex: p.open ? -1 : p.focusedIndex
        };
      });
    }), _defineProperty(_assertThisInitialized(_this), "onOptionClicked", function(_ref2) {
      var nativeEvent = _ref2.nativeEvent, setSelected = _this.props.setSelected;
      if (nativeEvent instanceof KeyboardEvent) {
        if (nativeEvent.keyCode !== KEY_CODES.ENTER) return;
        nativeEvent.preventDefault();
      }
      var selectedOption = nativeEvent.target.innerText;
      setSelected(selectedOption), _this.setState({
        open: !1,
        internalSelectedOption: selectedOption
      }), nativeEvent.keyCode && nativeEvent.keyCode === KEY_CODES.ENTER && _this.button.focus();
    }), _defineProperty(_assertThisInitialized(_this), "onKeyDown", function(_ref3) {
      var nativeEvent = _ref3.nativeEvent, key = nativeEvent.key && nativeEvent.key.toLowerCase(), keyCode = nativeEvent.keyCode, searchable = _this.props.searchable;
      -1 !== NAVIGATION_KEYS.indexOf(keyCode) ? (nativeEvent.preventDefault(), _this.onNavigation(keyCode)) : keyCode === KEY_CODES.TAB ? _this.closeDropdown() : 1 === key.length && searchable && _this.searchDropdown(key);
    }), _defineProperty(_assertThisInitialized(_this), "onNavigation", function(keyCode) {
      var focusedIndex = _this.state.focusedIndex, pageKeyTraverseSize = _this.props.pageKeyTraverseSize;
      switch (keyCode) {
       case KEY_CODES.UP_ARROW:
        -1 === focusedIndex ? _this.setState({
          focusedIndex: 0
        }, _this.setFocus) : 0 === focusedIndex ? _this.setState({
          focusedIndex: _this.elements.length - 1
        }, _this.setFocus) : _this.setState(function(p) {
          return {
            focusedIndex: p.focusedIndex - 1
          };
        }, _this.setFocus);
        break;

       case KEY_CODES.DOWN_ARROW:
        _this.setState(function(p) {
          return {
            focusedIndex: (p.focusedIndex + 1) % _this.elements.length
          };
        }, _this.setFocus);
        break;

       case KEY_CODES.PAGE_UP:
        -1 === focusedIndex ? _this.setState({
          focusedIndex: 0
        }, _this.setFocus) : focusedIndex - pageKeyTraverseSize < 0 ? _this.setState({
          focusedIndex: _this.elements.length - 1
        }, _this.setFocus) : _this.setState(function(p) {
          return {
            focusedIndex: p.focusedIndex - pageKeyTraverseSize - 1
          };
        }, _this.setFocus);
        break;

       case KEY_CODES.PAGE_DOWN:
        _this.setState(function(p) {
          return {
            focusedIndex: (p.focusedIndex + pageKeyTraverseSize - 1) % _this.elements.length
          };
        }, _this.setFocus);
        break;

       case KEY_CODES.ESCAPE:
        _this.closeDropdown(!0);
      }
    }), _defineProperty(_assertThisInitialized(_this), "getStyle", function(key, extraState) {
      var style = _this.props.style, baseStyle = defaultStyles[key](_this.props, _this.state, extraState), customStyle = style[key];
      return customStyle ? emotion.css(customStyle(baseStyle, _this.state, extraState), "") : emotion.css(baseStyle, "");
    }), _defineProperty(_assertThisInitialized(_this), "setFocus", function() {
      var focusedIndex = _this.state.focusedIndex;
      _this.elements[focusedIndex].focus();
    }), _defineProperty(_assertThisInitialized(_this), "closeDropdown", function() {
      var focus = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
      _this.setState(function(p) {
        return {
          open: !1,
          focusedIndex: p.internalSelectedOption ? p.focusedIndex : -1
        };
      }), focus && _this.button.focus();
    }), _defineProperty(_assertThisInitialized(_this), "searchDropdown", function(key) {
      var oldTerm = _this.state.searchTerm;
      _this.setState(function(p) {
        return {
          searchTerm: p.searchTerm + key
        };
      }), _this.searchList(oldTerm + key), _this.clearTimer();
      var timer = setTimeout(_this.clearSearch, 1500);
      _this.setState({
        searchTimer: timer
      });
    }), _defineProperty(_assertThisInitialized(_this), "clearTimer", function() {
      var searchTimer = _this.state.searchTimer;
      -1 !== searchTimer && (clearTimeout(searchTimer), _this.setState({
        searchTimer: -1
      }));
    }), _defineProperty(_assertThisInitialized(_this), "clearSearch", function() {
      _this.setState({
        searchTerm: ""
      });
    }), _defineProperty(_assertThisInitialized(_this), "searchList", function(value) {
      var element = _this.elements.find(function(el) {
        return 0 === el.innerText.toLowerCase().indexOf(value);
      });
      element && element.focus();
    }), _defineProperty(_assertThisInitialized(_this), "renderOptions", function() {
      var _this$props = _this.props, optionRenderer = _this$props.optionRenderer, selectedOption = _this$props.selectedOption, selectedOptionClassName = _this$props.selectedOptionClassName, optionClassName = _this$props.optionClassName, options = _this$props.options, internalSelectedOption = _this.state.internalSelectedOption;
      return _this.elements = [], optionRenderer ? optionRenderer(selectedOption || internalSelectedOption, options, _this.onOptionClicked, _this.elements, _this.getStyle) : defaultOptionRenderer(selectedOption, options, selectedOptionClassName, optionClassName, _this.onOptionClicked, _this.elements, _this.getStyle);
    }), _this.state = {
      open: !1,
      searchTerm: "",
      searchTimer: -1,
      focusedIndex: -1,
      internalSelectedOption: null
    }, _this.elements = [], _this;
  }
  return _inherits(Dropdown, _Component), _createClass(Dropdown, [ {
    key: "componentDidMount",
    value: function() {
      document.addEventListener("mouseup", this.onClick, !1), document.addEventListener("touchend", this.onClick, !1);
    }
  }, {
    key: "componentWillUnmount",
    value: function() {
      document.removeEventListener("mouseup", this.onClick), document.removeEventListener("touchend", this.onClick);
    }
  }, {
    key: "render",
    value: function() {
      var _this2 = this, _this$props2 = this.props, ariaDescribedBy = _this$props2.ariaDescribedBy, ariaLabel = _this$props2.ariaLabel, ariaLabelledBy = _this$props2.ariaLabelledBy, arrowRenderer = _this$props2.arrowRenderer, contentClassName = _this$props2.contentClassName, buttonClassName = _this$props2.buttonClassName, disabled = _this$props2.disabled, hideArrow = _this$props2.hideArrow, id = _this$props2.id, placeholder = _this$props2.placeholder, selectedOption = _this$props2.selectedOption, selectedValueClassName = _this$props2.selectedValueClassName, _this$state = this.state, internalSelectedOption = _this$state.internalSelectedOption, open = _this$state.open, displayedValue = selectedOption || internalSelectedOption || placeholder || "", wrapperClass = this.getStyle("dropdownWrapper"), dropdownButtonClass = emotion.cx(buttonClassName, this.getStyle("dropdownButton")), displayedValueClass = emotion.cx(selectedValueClassName, this.getStyle("displayedValue")), contentClass = emotion.cx(contentClassName, this.getStyle("optionContainer")), arrowClass = this.getStyle("arrow");
      return React__default.createElement("div", {
        className: wrapperClass,
        onKeyDown: this.onKeyDown,
        ref: function(div) {
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
        ref: function(btn) {
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
  } ]), Dropdown;
}(React.Component);

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
}, Dropdown.defaultProps = {
  ariaDescribedBy: null,
  ariaLabel: null,
  ariaLabelledBy: null,
  arrowRenderer: void 0,
  buttonClassName: void 0,
  centerText: !1,
  contentClassName: void 0,
  disabled: !1,
  height: null,
  hideArrow: !1,
  id: void 0,
  openUp: !1,
  optionRenderer: void 0,
  options: [],
  optionClassName: void 0,
  maxContentHeight: null,
  pageKeyTraverseSize: 10,
  placeholder: "Select ...",
  searchable: !0,
  selectedOption: null,
  selectedOptionClassName: void 0,
  selectedValueClassName: void 0,
  style: {},
  width: null
}, exports.default = Dropdown;
