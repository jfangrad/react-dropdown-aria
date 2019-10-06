"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var colours_1 = tslib_1.__importDefault(require("./colours"));
var OptionItem_1 = tslib_1.__importDefault(require("./OptionItem"));
var DropdownWrapper = function (_a) {
    var width = _a.width, height = _a.height;
    return ({
        display: 'flex',
        flexDirection: 'column',
        height: height,
        position: 'relative',
        width: width,
    });
};
var DropdownButton = function (props, _a) {
    var open = _a.open;
    return ({
        alignItems: 'center',
        backgroundColor: colours_1.default.greys.lighter,
        border: "2px solid " + (open ? colours_1.default.states.focused : colours_1.default.greys.dark),
        borderRadius: '7',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'row',
        fontSize: '1em',
        height: '100%',
        margin: '0',
        outline: 'none',
        padding: '9px 5px 9px 12px',
        textAlign: 'left',
        width: '100%',
        '&:hover': {
            border: "2px solid " + colours_1.default.greys.darker,
        },
        '&:focus': {
            border: "2px solid " + colours_1.default.states.focused,
        },
        '&:disabled': {
            backgroundColor: colours_1.default.states.disabled,
            cursor: 'unset',
        },
    });
};
var DisplayedValue = function (_a, _b) {
    var hideArrow = _a.hideArrow, selectedOption = _a.selectedOption, centerText = _a.centerText;
    var internalSelectedOption = _b.internalSelectedOption;
    return ({
        borderRight: hideArrow ? 'none' : "1px solid " + colours_1.default.greys.light,
        color: (selectedOption || internalSelectedOption) ? 'black' : colours_1.default.greys.base,
        flex: '1',
        overflow: 'hidden',
        textAlign: centerText ? 'center' : 'left',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    });
};
var Arrow = function (props, _a) {
    var open = _a.open;
    return ({
        borderBottom: open ? "5px solid " + colours_1.default.greys.base : '0',
        borderLeft: '5px solid transparent',
        borderRight: '5px solid transparent',
        borderTop: open ? '0' : "5px solid " + colours_1.default.greys.base,
        content: '""',
        height: '0',
        marginLeft: '8px',
        marginRight: '5px',
        width: '0',
    });
};
var OptionContainer = function (_a, _b) {
    var openUp = _a.openUp, maxContentHeight = _a.maxContentHeight;
    var open = _b.open;
    return ({
        backgroundColor: colours_1.default.greys.lighter,
        border: "2px solid " + colours_1.default.greys.darker,
        borderRadius: '4px',
        bottom: openUp ? '105%' : undefined,
        boxShadow: "0px " + (openUp ? '-4px' : '4px') + " 4px rgba(0, 0, 0, 0.25)",
        boxSizing: 'border-box',
        color: 'black',
        display: open ? 'block' : 'none',
        left: '0',
        listStyleType: 'none',
        margin: '0',
        maxHeight: maxContentHeight || '175px',
        overflowX: 'hidden',
        overflowY: maxContentHeight ? 'scroll' : undefined,
        padding: '2px 0',
        position: 'absolute',
        top: openUp ? undefined : '100%',
        width: '100%',
        zIndex: 9999,
        '&::-webkit-scrollbar': {
            width: '5px',
        },
        '&::-webkit-scrollbar-track': {
            background: '#ddd',
        },
        '&::-webkit-scrollbar-thumb': {
            background: '#666',
        },
    });
};
var GroupContainer = function () { return ({
    padding: '1em 0 0 0',
}); };
var GroupHeading = function () { return ({
    color: 'grey',
    display: 'flex',
    flexDirection: 'row',
    fontSize: '0.9em',
    padding: '0 10px 3px 5px',
}); };
var GroupDivider = function () { return ({
    borderBottom: "1px solid " + colours_1.default.greys.dark,
    margin: 'auto',
    paddingTop: 10,
    width: '85%',
}); };
var defaultStyles = {
    Arrow: Arrow,
    DisplayedValue: DisplayedValue,
    DropdownButton: DropdownButton,
    DropdownWrapper: DropdownWrapper,
    GroupContainer: GroupContainer,
    GroupDivider: GroupDivider,
    GroupHeading: GroupHeading,
    OptionContainer: OptionContainer,
    OptionItem: OptionItem_1.default,
};
exports.default = defaultStyles;
