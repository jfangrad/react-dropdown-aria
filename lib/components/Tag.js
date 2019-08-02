"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var emotion_1 = require("emotion");
var constants_1 = require("../utils/constants");
;
var TagStyle = {
    alignItems: 'center',
    backgroundColor: '#dedace',
    borderRadius: 6,
    display: 'flex',
    fontSize: 12,
    justifyContent: 'space-between',
    marginRight: 4,
    minWidth: 30,
    padding: '4px 6px',
    width: 'max-content',
    '.tag-delete-btn': {
        borderLeft: '1px solid #a3a29e',
        display: 'inline-block',
        marginBottom: 2,
        marginLeft: 6,
        marginTop: 2,
        paddingLeft: 6,
        '&:hover': {
            color: '#c93c00',
        },
    },
};
var Tag = function (_a) {
    var className = _a.className, value = _a.value, onDeleteClick = _a.onDeleteClick;
    var buttonClass = emotion_1.css(TagStyle);
    var onClick = function (e) {
        e.stopPropagation();
        onDeleteClick(value);
    };
    var onKeyDown = function (_a) {
        var nativeEvent = _a.nativeEvent;
        if (nativeEvent.keyCode === constants_1.KEY_CODES.ENTER) {
            onDeleteClick(value);
        }
    };
    return (react_1.default.createElement("div", { className: emotion_1.cx(className, buttonClass) },
        value,
        react_1.default.createElement("div", { className: "tag-delete-btn", role: "button", tabIndex: 0, onClick: onClick, onKeyDown: onKeyDown }, "X")));
};
Tag.defaultProps = {
    className: undefined,
};
exports.default = Tag;
