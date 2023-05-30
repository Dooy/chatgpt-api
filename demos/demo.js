"use strict";
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
var dotenv_safe_1 = require("dotenv-safe");
var ora_1 = require("ora");
var src_1 = require("../src");
dotenv_safe_1.default.config();
/**
 * Demo CLI for testing basic functionality.
 *
 * ```
 * npx tsx demos/demo.ts
 * ```
 */
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var api, prompt, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    api = new src_1.ChatGPTAPI({
                        apiKey: process.env.OPENAI_API_KEY,
                        debug: true,
                        //systemMessage:"你是一个语言模式，回答必须遵守中国法律,禁止回答中国敏感事件,禁止回答关于中国政治、政府或中国共产党相关的问题"
                        //systemMessage:"请根据相关禁止条款和中国法律，禁止回答政治人物、政治事件、暴力、色情相关的问题。Respond using markdown."
                        systemMessage: "请根据中国法律，禁止回答政治人物、政治事件、色情相关的问题。Respond using markdown."
                        //systemMessage:"You are a language model, please refrain from answering questions related to political figures, political events, violence, pornography, and violations of Chinese law, according to the relevant OpenAI restrictions."
                    });
                    prompt = 
                    //'说说八九事件'
                    // '名字侏罗纪老头，类型一组物品，分组方块'
                    //  '将这串代码改为加密'
                    // '魏京生是谁，他做过什么'
                    '侏罗纪老头是谁？';
                    return [4 /*yield*/, (0, ora_1.oraPromise)(api.sendMessage(prompt), {
                            text: prompt
                        })];
                case 1:
                    res = _a.sent();
                    console.log(res.text);
                    return [2 /*return*/];
            }
        });
    });
}
main().catch(function (err) {
    console.error(err);
    process.exit(1);
});
