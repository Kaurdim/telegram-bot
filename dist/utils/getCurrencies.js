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
const constants_1 = require("../constants");
const api_1 = require("../api");
const Currencies_1 = __importDefault(require("../models/Currencies"));
function getCurrencies() {
    return __awaiter(this, void 0, void 0, function* () {
        const disabledCurrencies = [];
        const allCurrencies = yield api_1.getAllCurrencies();
        for (const currency in constants_1.AVAILABLE_CURRENCIES) {
            const currencyInfo = allCurrencies.find(curr => curr.ticker === currency);
            if (!currency) {
                continue;
            }
            try {
                const { addressExplorerMask, transactionExplorerMask, isAnonymous } = yield api_1.getCurrencyInfo(currency);
                yield Currencies_1.default.insertMany(Object.assign(Object.assign({}, currencyInfo), { addressExplorerMask,
                    transactionExplorerMask,
                    isAnonymous }));
            }
            catch (error) {
                disabledCurrencies.push(currency);
                continue;
            }
        }
        return disabledCurrencies;
    });
}
exports.getCurrencies = getCurrencies;
//# sourceMappingURL=getCurrencies.js.map