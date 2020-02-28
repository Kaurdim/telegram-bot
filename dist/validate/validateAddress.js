"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const currencies_regex_json_1 = __importDefault(require("../validate/currencies-regex.json"));
exports.validateAddress = (currency, address) => {
    if (currencies_regex_json_1.default[currency.toLowerCase()]) {
        const matches = address.match(currencies_regex_json_1.default[currency.toLowerCase()].regEx);
        if (matches) {
            return true;
        }
    }
    return false;
};
//# sourceMappingURL=validateAddress.js.map