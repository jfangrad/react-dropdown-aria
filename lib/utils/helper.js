"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isOptionGroup(option) {
    return option.groupOptions !== undefined;
}
exports.isOptionGroup = isOptionGroup;
function isArray(value) {
    return Array.isArray(value);
}
exports.isArray = isArray;
