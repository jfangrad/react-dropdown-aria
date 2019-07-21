"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var emotion_1 = require("emotion");
var OptionItem_1 = tslib_1.__importDefault(require("../components/OptionItem"));
var helper_1 = require("./helper");
var constants_1 = require("./constants");
var pushRef = function (elementsRef) { return function (element) {
    if (element) {
        elementsRef.push(element);
    }
}; };
function defaultOptionRenderer(selectedOption, options, selectedOptionClassName, optionClassName, onOptionClicked, elementsRef, getStyle) {
    return options.map(function (option) {
        if (helper_1.isOptionGroup(option)) { // Is group of options
            var _a = option, groupOptions = _a.groupOptions, label = _a.label;
            return (react_1.default.createElement("div", { key: label, className: getStyle(constants_1.StyleKeys.GroupContainer) },
                react_1.default.createElement("div", { className: getStyle(constants_1.StyleKeys.GroupHeading) },
                    react_1.default.createElement("div", null, label.toUpperCase()),
                    react_1.default.createElement("div", null, groupOptions.length)),
                groupOptions.map(function (groupOption) {
                    var selected = groupOption.value === selectedOption;
                    var groupOptionClass = emotion_1.cx(groupOption.className, getStyle(constants_1.StyleKeys.OptionItem, { selected: selected }));
                    return (react_1.default.createElement(OptionItem_1.default, { key: groupOption.value, optionClass: groupOptionClass, onOptionClicked: onOptionClicked, option: groupOption, ref: pushRef(elementsRef) }));
                })));
        }
        var value = option.value, className = option.className;
        var optionClass = emotion_1.cx(className, getStyle(constants_1.StyleKeys.OptionItem, { selected: value === selectedOption }));
        return (react_1.default.createElement(OptionItem_1.default, { key: value, optionClass: optionClass, onOptionClicked: onOptionClicked, option: option, ref: pushRef(elementsRef) }));
    });
}
exports.default = defaultOptionRenderer;
