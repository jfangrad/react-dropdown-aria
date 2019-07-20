"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var colours_1 = tslib_1.__importDefault(require("./colours"));
exports.default = (function (props, state, _a) {
    var _b = _a.selected, selected = _b === void 0 ? false : _b;
    return ({
        backgroundColor: selected ? colours_1.default.purple.lighter : 'white',
        border: 'none',
        cursor: 'pointer',
        fontSize: '0.95em',
        outline: 'none',
        overflow: 'hidden',
        padding: '5px 10px',
        textAlign: 'left',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: '100%',
        '&:hover': {
            backgroundColor: selected ? colours_1.default.purple.light : colours_1.default.greys.lighter,
        },
        '&:focus': {
            backgroundColor: selected ? colours_1.default.purple.light : colours_1.default.greys.lighter,
        },
        '.option-icon': {
            paddingRight: '5px',
        },
    });
});
