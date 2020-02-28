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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const request_promise_1 = __importDefault(require("request-promise"));
const API_KEY = process.env.CHANGE_NOW_API_KEY;
const API_URL = 'https://changenow.io/api/v1';
const _apiRequest = (options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resp = yield request_promise_1.default(options);
        return resp;
    }
    catch (err) {
        console.log(err.error.error);
        throw new Error(err.error.error);
    }
});
exports.getAllCurrencies = () => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        uri: `${API_URL}/currencies?active=true`,
        json: true
    };
    return yield _apiRequest(options);
});
exports.getPairsForCurency = (ticker) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        uri: `${API_URL}/currencies-to/${ticker}?active=true`,
        json: true
    };
    return yield _apiRequest(options);
});
exports.getPairs = () => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        uri: `${API_URL}/market-info/available-pairs/?api_key=${API_KEY}`,
        json: true
    };
    return yield _apiRequest(options);
});
exports.getMinAmount = (from, to) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        uri: `${API_URL}/min-amount/${from}_${to}`,
        json: true
    };
    return yield _apiRequest(options);
});
exports.getCurrencyInfo = (tiker) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        uri: `${API_URL}/currencies/${tiker}?api_key=${API_KEY}`,
        json: true
    };
    const currency = yield _apiRequest(options);
    return currency;
});
exports.getExchAmount = (amount, from, to) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        uri: `${API_URL}/exchange-amount/${amount}/${from}_${to}?api_key=${API_KEY}`,
        json: true
    };
    return yield _apiRequest(options);
});
exports.createTransaction = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        method: 'POST',
        uri: `${API_URL}/transactions/${API_KEY}`,
        body: data,
        json: true
    };
    return yield _apiRequest(options);
});
exports.getTransactionStatus = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        uri: `${API_URL}/transactions/${id}/${API_KEY}`,
        json: true
    };
    return yield _apiRequest(options);
});
//# sourceMappingURL=api.js.map