"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var emotion_1 = require("emotion");
;
var TagStyle = {
    backgroundColor: '#dedace',
    borderRadius: 6,
    fontSize: 12,
    marginRight: 4,
    padding: 4,
    width: 'max-content',
    '.tag-delete-btn': {
        borderLeft: '1px solid #a3a29e',
        marginBottom: 2,
        marginLeft: 6,
        marginTop: 2,
        paddingLeft: 2,
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
    return (react_1.default.createElement("div", { className: emotion_1.cx(className, buttonClass) },
        value,
        react_1.default.createElement("span", { className: "tag-delete-btn", onClick: onClick }, "X")));
};
Tag.defaultProps = {
    className: undefined,
};
exports.default = Tag;
