"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGPTUnofficialProxyAPI = void 0;
var p_timeout_1 = require("p-timeout");
var uuid_1 = require("uuid");
var fetch_1 = require("./fetch");
var fetch_sse_1 = require("./fetch-sse");
var utils_1 = require("./utils");
var ChatGPTUnofficialProxyAPI = /** @class */ (function () {
    /**
     * @param fetch - Optional override for the `fetch` implementation to use. Defaults to the global `fetch` function.
     */
    function ChatGPTUnofficialProxyAPI(opts) {
        var accessToken = opts.accessToken, _a = opts.apiReverseProxyUrl, apiReverseProxyUrl = _a === void 0 ? 'https://bypass.duti.tech/api/conversation' : _a, _b = opts.model, model = _b === void 0 ? 'text-davinci-002-render-sha' : _b, _c = opts.debug, debug = _c === void 0 ? false : _c, headers = opts.headers, _d = opts.fetch, fetch = _d === void 0 ? fetch_1.fetch : _d;
        this._accessToken = accessToken;
        this._apiReverseProxyUrl = apiReverseProxyUrl;
        this._debug = !!debug;
        this._model = model;
        this._fetch = fetch;
        this._headers = headers;
        if (!this._accessToken) {
            throw new Error('ChatGPT invalid accessToken');
        }
        if (!this._fetch) {
            throw new Error('Invalid environment; fetch is not defined');
        }
        if (typeof this._fetch !== 'function') {
            throw new Error('Invalid "fetch" is not a function');
        }
    }
    Object.defineProperty(ChatGPTUnofficialProxyAPI.prototype, "accessToken", {
        get: function () {
            return this._accessToken;
        },
        set: function (value) {
            this._accessToken = value;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Sends a message to ChatGPT, waits for the response to resolve, and returns
     * the response.
     *
     * If you want your response to have historical context, you must provide a valid `parentMessageId`.
     *
     * If you want to receive a stream of partial responses, use `opts.onProgress`.
     * If you want to receive the full response, including message and conversation IDs,
     * you can use `opts.onConversationResponse` or use the `ChatGPTAPI.getConversation`
     * helper.
     *
     * Set `debug: true` in the `ChatGPTAPI` constructor to log more info on the full prompt sent to the OpenAI completions API. You can override the `promptPrefix` and `promptSuffix` in `opts` to customize the prompt.
     *
     * @param message - The prompt message to send
     * @param opts.conversationId - Optional ID of a conversation to continue (defaults to a random UUID)
     * @param opts.parentMessageId - Optional ID of the previous message in the conversation (defaults to `undefined`)
     * @param opts.messageId - Optional ID of the message to send (defaults to a random UUID)
     * @param opts.timeoutMs - Optional timeout in milliseconds (defaults to no timeout)
     * @param opts.onProgress - Optional callback which will be invoked every time the partial response is updated
     * @param opts.abortSignal - Optional callback used to abort the underlying `fetch` call using an [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
     *
     * @returns The response from ChatGPT
     */
    ChatGPTUnofficialProxyAPI.prototype.sendMessage = function (text, opts) {
        if (opts === void 0) { opts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var conversationId, _a, parentMessageId, _b, messageId, _c, action, timeoutMs, onProgress, abortSignal, abortController, body, result, responseP;
            var _this = this;
            return __generator(this, function (_d) {
                if (!!opts.conversationId !== !!opts.parentMessageId) {
                    throw new Error('ChatGPTUnofficialProxyAPI.sendMessage: conversationId and parentMessageId must both be set or both be undefined');
                }
                if (opts.conversationId && !(0, utils_1.isValidUUIDv4)(opts.conversationId)) {
                    throw new Error('ChatGPTUnofficialProxyAPI.sendMessage: conversationId is not a valid v4 UUID');
                }
                if (opts.parentMessageId && !(0, utils_1.isValidUUIDv4)(opts.parentMessageId)) {
                    throw new Error('ChatGPTUnofficialProxyAPI.sendMessage: parentMessageId is not a valid v4 UUID');
                }
                if (opts.messageId && !(0, utils_1.isValidUUIDv4)(opts.messageId)) {
                    throw new Error('ChatGPTUnofficialProxyAPI.sendMessage: messageId is not a valid v4 UUID');
                }
                conversationId = opts.conversationId, _a = opts.parentMessageId, parentMessageId = _a === void 0 ? (0, uuid_1.v4)() : _a, _b = opts.messageId, messageId = _b === void 0 ? (0, uuid_1.v4)() : _b, _c = opts.action, action = _c === void 0 ? 'next' : _c, timeoutMs = opts.timeoutMs, onProgress = opts.onProgress;
                abortSignal = opts.abortSignal;
                abortController = null;
                if (timeoutMs && !abortSignal) {
                    abortController = new AbortController();
                    abortSignal = abortController.signal;
                }
                body = {
                    action: action,
                    messages: [
                        {
                            id: messageId,
                            role: 'user',
                            content: {
                                content_type: 'text',
                                parts: [text]
                            }
                        }
                    ],
                    model: this._model,
                    parent_message_id: parentMessageId
                };
                if (conversationId) {
                    body.conversation_id = conversationId;
                }
                result = {
                    role: 'assistant',
                    id: (0, uuid_1.v4)(),
                    parentMessageId: messageId,
                    conversationId: conversationId,
                    text: ''
                };
                responseP = new Promise(function (resolve, reject) {
                    var url = _this._apiReverseProxyUrl;
                    var headers = __assign(__assign({}, _this._headers), { Authorization: "Bearer ".concat(_this._accessToken), Accept: 'text/event-stream', 'Content-Type': 'application/json' });
                    if (_this._debug) {
                        console.log('POST', url, { body: body, headers: headers });
                    }
                    (0, fetch_sse_1.fetchSSE)(url, {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify(body),
                        signal: abortSignal,
                        onMessage: function (data) {
                            var _a, _b, _c;
                            if (data === '[DONE]') {
                                return resolve(result);
                            }
                            try {
                                var convoResponseEvent = JSON.parse(data);
                                if (convoResponseEvent.conversation_id) {
                                    result.conversationId = convoResponseEvent.conversation_id;
                                }
                                if ((_a = convoResponseEvent.message) === null || _a === void 0 ? void 0 : _a.id) {
                                    result.id = convoResponseEvent.message.id;
                                }
                                var message = convoResponseEvent.message;
                                // console.log('event', JSON.stringify(convoResponseEvent, null, 2))
                                if (message) {
                                    var text_1 = (_c = (_b = message === null || message === void 0 ? void 0 : message.content) === null || _b === void 0 ? void 0 : _b.parts) === null || _c === void 0 ? void 0 : _c[0];
                                    if (text_1) {
                                        result.text = text_1;
                                        if (onProgress) {
                                            onProgress(result);
                                        }
                                    }
                                }
                            }
                            catch (err) {
                                if (_this._debug) {
                                    console.warn('chatgpt unexpected JSON error', err);
                                }
                                // reject(err)
                            }
                        },
                        onError: function (err) {
                            reject(err);
                        }
                    }, _this._fetch).catch(function (err) {
                        var errMessageL = err.toString().toLowerCase();
                        if (result.text &&
                            (errMessageL === 'error: typeerror: terminated' ||
                                errMessageL === 'typeerror: terminated')) {
                            // OpenAI sometimes forcefully terminates the socket from their end before
                            // the HTTP request has resolved cleanly. In my testing, these cases tend to
                            // happen when OpenAI has already send the last `response`, so we can ignore
                            // the `fetch` error in this case.
                            return resolve(result);
                        }
                        else {
                            return reject(err);
                        }
                    });
                });
                if (timeoutMs) {
                    if (abortController) {
                        // This will be called when a timeout occurs in order for us to forcibly
                        // ensure that the underlying HTTP request is aborted.
                        ;
                        responseP.cancel = function () {
                            abortController.abort();
                        };
                    }
                    return [2 /*return*/, (0, p_timeout_1.default)(responseP, {
                            milliseconds: timeoutMs,
                            message: 'ChatGPT timed out waiting for response'
                        })];
                }
                else {
                    return [2 /*return*/, responseP];
                }
                return [2 /*return*/];
            });
        });
    };
    return ChatGPTUnofficialProxyAPI;
}());
exports.ChatGPTUnofficialProxyAPI = ChatGPTUnofficialProxyAPI;
