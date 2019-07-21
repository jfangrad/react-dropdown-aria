"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
;
var OptionItem = react_1.forwardRef(function (props, ref) {
    var onOptionClicked = props.onOptionClicked, option = props.option, optionClass = props.optionClass;
    return (react_1.default.createElement("button", { "aria-label": option.ariaLabel, className: optionClass, onClick: onOptionClicked, onKeyDown: onOptionClicked, ref: ref, tabIndex: -1, title: option.title, type: "button" },
        option.iconClass && react_1.default.createElement("i", { className: option.iconClass + " option-icon" }),
        option.value));
});
OptionItem.defaultProps = {
    optionClass: undefined,
};
exports.default = OptionItem;
