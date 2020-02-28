"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.TransactionSchema = new mongoose_1.default.Schema({
    _id: String,
    payinAddress: String,
    payoutAddress: String,
    postepayoutExtraIdrUrl: String,
    fromCurrency: String,
    toCurrency: String,
    refundAddress: String,
    refundExtraId: String,
    amount: Number,
    userId: String
}, { _id: false });
const Transaction = mongoose_1.default.model('Transaction', exports.TransactionSchema);
exports.default = Transaction;
//# sourceMappingURL=Transaction.js.map