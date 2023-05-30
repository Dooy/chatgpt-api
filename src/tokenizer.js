"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = void 0;
var tiktoken_1 = require("@dqbd/tiktoken");
// TODO: make this configurable
var tokenizer = (0, tiktoken_1.get_encoding)('cl100k_base');
function encode(input) {
    return tokenizer.encode(input);
}
exports.encode = encode;
