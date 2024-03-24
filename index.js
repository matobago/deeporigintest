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
var ioredis_1 = require("ioredis");
var express = require('express');
var _a = require('express'), Request = _a.Request, Response = _a.Response;
var bodyParser = require('body-parser');
var shorten = require('./shortener').shorten;
var redis = new ioredis_1.default();
var app = express();
var PORT = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {
    res.send("\n        <form action=\"/shorten\" method=\"POST\">\n            <label for=\"inputField\">Enter URL:</label>\n            <input type=\"text\" id=\"inputField\" name=\"inputField\">\n            <button type=\"submit\">Shorten</button>\n        </form>\n    ");
});
app.get('/:shortenURL', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var shortenURL, keyExist, valueURL;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                shortenURL = req.params.shortenURL;
                return [4 /*yield*/, redis.exists(shortenURL)];
            case 1:
                keyExist = _a.sent();
                if (!keyExist) return [3 /*break*/, 3];
                return [4 /*yield*/, redis.get(shortenURL)];
            case 2:
                valueURL = _a.sent();
                res.redirect(valueURL);
                return [3 /*break*/, 4];
            case 3:
                res.status(404).send('URL not Found');
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/shorten', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var RENEW_KEY_ATTEMPTS, inputField, count, keyExist, shortenText, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                RENEW_KEY_ATTEMPTS = 10000;
                inputField = req.body.inputField;
                count = 0;
                keyExist = 0;
                shortenText = void 0;
                _a.label = 1;
            case 1:
                shortenText = shorten(inputField);
                return [4 /*yield*/, redis.exists(shortenText)];
            case 2:
                keyExist = _a.sent();
                count++;
                _a.label = 3;
            case 3:
                if ((keyExist === 1) && count < RENEW_KEY_ATTEMPTS) return [3 /*break*/, 1];
                _a.label = 4;
            case 4:
                if (keyExist === 1) {
                    res.status(409).json({ error: "".concat(RENEW_KEY_ATTEMPTS, " to generate key") });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, redis.set(shortenText, inputField)];
            case 5:
                _a.sent();
                res.status(201).send("Shorten URL: http://short.ly/".concat(shortenText));
                return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                console.error('Error occurred while shortening URL:', error_1);
                res.status(500).send('Internal Server Error');
                return [2 /*return*/];
            case 7: return [2 /*return*/];
        }
    });
}); });
if (require.main === module) {
    app.listen(PORT, function () {
        console.log("Server is running on port ".concat(PORT));
    });
}
exports.default = app;
