"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidUUIDv4 = void 0;
var uuidv4Re = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function isValidUUIDv4(str) {
    return str && uuidv4Re.test(str);
}
exports.isValidUUIDv4 = isValidUUIDv4;
