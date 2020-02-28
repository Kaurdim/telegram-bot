"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.CurrencySchema = new mongoose_1.default.Schema({
    ticker: String,
    name: String,
    image: String,
    hasExternalId: Boolean,
    isFiat: Boolean,
    featured: Boolean,
    isStable: Boolean,
    supportsFixedRate: Boolean,
    addressExplorerMask: String,
    transactionExplorerMask: String,
    isAnonymous: Boolean,
});
const Currency = mongoose_1.default.model('Currency', exports.CurrencySchema);
exports.default = Currency;
//# sourceMappingURL=Currencies.js.map