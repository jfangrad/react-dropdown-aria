"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var emotion_1 = require("emotion");
var constants_1 = require("../utils/constants");
var defaultOptionRenderer_1 = tslib_1.__importDefault(require("../utils/defaultOptionRenderer"));
var Dropdown_1 = tslib_1.__importDefault(require("../styles/Dropdown"));
var Dropdown = /** @class */ (function (_super) {
    tslib_1.__extends(Dropdown, _super);
    function Dropdown(props) {
        var _this = _super.call(this, props) || this;
        _this.elements = [];
        _this.container = react_1.createRef();
        _this.button = react_1.createRef();
        _this.renderArrow = function () {
            var _a = _this.props, hideArrow = _a.hideArrow, arrowRenderer = _a.arrowRenderer;
            var open = _this.state.open;
            var arrowClass = _this.getStyle(constants_1.StyleKeys.Arrow);
            if (hideArrow)
                return null;
            if (arrowRenderer)
                return arrowRenderer(open);
            return react_1.default.createElement("div", { className: arrowClass });
        };
        _this.renderOptions = function () {
            var _a = _this.props, optionRenderer = _a.optionRenderer, selectedOption = _a.selectedOption, selectedOptionClassName = _a.selectedOptionClassName, optionClassName = _a.optionClassName, options = _a.options;
            var internalSelectedOption = _this.state.internalSelectedOption;
            _this.elements = []; // Reset ref array
            if (optionRenderer) {
                return optionRenderer(selectedOption || internalSelectedOption, options, _this.onOptionClicked, _this.elements, _this.getStyle);
            }
            return defaultOptionRenderer_1.default(selectedOption, options, selectedOptionClassName, optionClassName, _this.onOptionClicked, _this.elements, _this.getStyle);
        };
        _this.onClick = function (e) {
            if (_this.container.current && !_this.container.current.contains(e.target)) {
                _this.closeDropdown();
            }
        };
        _this.onDropdownClick = function (_a) {
            var nativeEvent = _a.nativeEvent;
            var disabled = _this.props.disabled;
            if (nativeEvent instanceof KeyboardEvent) {
                if (nativeEvent.keyCode !== constants_1.KEY_CODES.ENTER)
                    return;
                nativeEvent.preventDefault();
            }
            if (!disabled) {
                _this.setState(function (p) { return ({ open: !p.open, focusedIndex: p.open ? -1 : p.focusedIndex }); });
            }
        };
        _this.onOptionClicked = function (_a) {
            var nativeEvent = _a.nativeEvent;
            var setSelected = _this.props.setSelected;
            if (nativeEvent instanceof KeyboardEvent) {
                if (nativeEvent.keyCode !== constants_1.KEY_CODES.ENTER)
                    return;
                nativeEvent.preventDefault();
            }
            if (nativeEvent.target) {
                var selectedOption = nativeEvent.target.innerText;
                setSelected(selectedOption);
                _this.setState({ open: false, internalSelectedOption: selectedOption });
                if (nativeEvent instanceof KeyboardEvent && nativeEvent.keyCode && nativeEvent.keyCode === constants_1.KEY_CODES.ENTER && _this.button.current) {
                    _this.button.current.focus();
                }
            }
        };
        _this.onKeyDown = function (_a) {
            var nativeEvent = _a.nativeEvent;
            var keyCode = nativeEvent.keyCode, key = nativeEvent.key;
            var searchable = _this.props.searchable;
            if (constants_1.NAVIGATION_KEYS.indexOf(keyCode) !== -1) {
                nativeEvent.preventDefault();
                _this.onNavigation(keyCode);
            }
            else if (keyCode === constants_1.KEY_CODES.TAB) {
                _this.closeDropdown();
            }
            else if (key.length === 1 && searchable) {
                _this.searchDropdown(key.toLowerCase());
            }
        };
        _this.onNavigation = function (keyCode) {
            var focusedIndex = _this.state.focusedIndex;
            var pageKeyTraverseSize = _this.props.pageKeyTraverseSize;
            switch (keyCode) {
                case constants_1.KEY_CODES.UP_ARROW:
                    if (focusedIndex === -1) {
                        _this.setState({ focusedIndex: 0 }, _this.setFocus);
                    }
                    else if (focusedIndex === 0) {
                        _this.setState({ focusedIndex: _this.elements.length - 1 }, _this.setFocus);
                    }
                    else {
                        _this.setState(function (p) { return ({ focusedIndex: p.focusedIndex - 1 }); }, _this.setFocus);
                    }
                    break;
                case constants_1.KEY_CODES.DOWN_ARROW:
                    _this.setState(function (p) { return ({ focusedIndex: (p.focusedIndex + 1) % _this.elements.length }); }, _this.setFocus);
                    break;
                case constants_1.KEY_CODES.PAGE_UP:
                    if (focusedIndex === -1 || (focusedIndex - pageKeyTraverseSize < 0 && focusedIndex !== 0)) {
                        _this.setState({ focusedIndex: 0 }, _this.setFocus);
                    }
                    else if (focusedIndex - pageKeyTraverseSize < 0) {
                        _this.setState({ focusedIndex: _this.elements.length - 1 }, _this.setFocus);
                    }
                    else {
                        _this.setState(function (p) { return ({ focusedIndex: p.focusedIndex - pageKeyTraverseSize }); }, _this.setFocus);
                    }
                    break;
                case constants_1.KEY_CODES.PAGE_DOWN:
                    if (focusedIndex === -1 || focusedIndex === _this.elements.length - 1) {
                        _this.setState({ focusedIndex: 0 }, _this.setFocus);
                    }
                    else if (focusedIndex + pageKeyTraverseSize > _this.elements.length - 1) {
                        _this.setState({ focusedIndex: _this.elements.length - 1 }, _this.setFocus);
                    }
                    else {
                        _this.setState(function (p) { return ({ focusedIndex: (p.focusedIndex + pageKeyTraverseSize) % _this.elements.length }); }, _this.setFocus);
                    }
                    break;
                case constants_1.KEY_CODES.ESCAPE:
                    _this.closeDropdown(true);
                    break;
                default:
                    break;
            }
        };
        _this.getStyle = function (key, extraState) {
            var style = _this.props.style;
            var baseStyle = Dropdown_1.default[key](_this.props, _this.state, extraState || {});
            var customStyle = style[key];
            return customStyle ? emotion_1.css(customStyle(baseStyle, _this.state, extraState)) : emotion_1.css(baseStyle);
        };
        _this.setFocus = function () {
            var focusedIndex = _this.state.focusedIndex;
            var element = _this.elements[focusedIndex];
            if (element) {
                element.focus();
            }
        };
        _this.closeDropdown = function (focus) {
            if (focus === void 0) { focus = false; }
            _this.setState(function (p) { return ({ open: false, focusedIndex: p.internalSelectedOption ? p.focusedIndex : -1 }); });
            if (focus && _this.button.current) {
                _this.button.current.focus();
            }
        };
        _this.searchDropdown = function (key) {
            var searchTerm = _this.state.searchTerm;
            var oldTerm = searchTerm;
            _this.setState(function (p) { return ({ searchTerm: p.searchTerm + key }); });
            _this.searchList(oldTerm + key);
            _this.clearTimer();
            var timer = setTimeout(_this.clearSearch, 1500);
            _this.setState({ searchTimer: timer });
        };
        _this.searchList = function (value) {
            var element = _this.elements.find(function (el) { return el && el.innerText.toLowerCase().indexOf(value) === 0; });
            if (element)
                element.focus();
        };
        _this.clearTimer = function () {
            var searchTimer = _this.state.searchTimer;
            if (searchTimer) {
                clearTimeout(searchTimer);
                _this.setState({ searchTimer: null });
            }
        };
        _this.clearSearch = function () {
            _this.setState({ searchTerm: '' });
        };
        _this.state = {
            focusedIndex: -1,
            internalSelectedOption: props.selectedOption,
            open: false,
            searchTerm: '',
            searchTimer: null,
        };
        return _this;
    }
    Dropdown.prototype.componentDidMount = function () {
        document.addEventListener('mouseup', this.onClick, false);
        document.addEventListener('touchend', this.onClick, false);
    };
    Dropdown.prototype.componentWillUnmount = function () {
        document.removeEventListener('mouseup', this.onClick);
        document.removeEventListener('touchend', this.onClick);
    };
    Dropdown.prototype.render = function () {
        var _a = this.props, ariaDescribedBy = _a.ariaDescribedBy, ariaLabel = _a.ariaLabel, ariaLabelledBy = _a.ariaLabelledBy, contentClassName = _a.contentClassName, buttonClassName = _a.buttonClassName, disabled = _a.disabled, id = _a.id, placeholder = _a.placeholder, selectedOption = _a.selectedOption, selectedValueClassName = _a.selectedValueClassName;
        var internalSelectedOption = this.state.internalSelectedOption;
        var displayedValue = selectedOption || internalSelectedOption || placeholder || '';
        var wrapperClass = this.getStyle(constants_1.StyleKeys.DropdownWrapper);
        var dropdownButtonClass = emotion_1.cx(buttonClassName, this.getStyle(constants_1.StyleKeys.DropdownButton));
        var displayedValueClass = emotion_1.cx(selectedValueClassName, this.getStyle(constants_1.StyleKeys.DisplayedValue));
        var contentClass = emotion_1.cx(contentClassName, this.getStyle(constants_1.StyleKeys.OptionContainer));
        return (react_1.default.createElement("div", { className: wrapperClass, onKeyDown: this.onKeyDown, ref: this.container },
            react_1.default.createElement("button", { "aria-label": ariaLabel, "ari-describedby": ariaDescribedBy, "aria-labelledby": ariaLabelledBy, className: dropdownButtonClass, disabled: disabled, id: id, onClick: this.onDropdownClick, onKeyDown: this.onDropdownClick, ref: this.button, type: "button" },
                react_1.default.createElement("div", { className: displayedValueClass }, displayedValue),
                this.renderArrow()),
            react_1.default.createElement("ul", { className: contentClass }, this.renderOptions())));
    };
    Dropdown.defaultProps = {
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
    return Dropdown;
}(react_1.Component));
exports.default = Dropdown;
