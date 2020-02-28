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
const telegraf_1 = require("telegraf");
const wizard_1 = __importDefault(require("telegraf/scenes/wizard"));
const currencyMurkup_1 = require("../../utils/currencyMurkup");
const Currencies_1 = __importDefault(require("../../models/Currencies"));
const select_from_1 = __importDefault(require("./select-from"));
const api_1 = require("../../api");
const exchange = new wizard_1.default('exchange', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.reply('oben');
    const currencies = yield Currencies_1.default.find({});
    ctx.session.currencyPage = 1;
    ctx.replyWithHTML(`
    Выберите <b>валюту</b> на которую выхотите обменять.
    Досступно валют: ${currencies.length}.
    `, telegraf_1.Markup.inlineKeyboard(currencyMurkup_1.currencyMurkup(currencies, ctx)).resize().extra());
    return ctx.wizard.next();
}), select_from_1.default, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const currencies = yield api_1.getPairsForCurency(ctx.session.from.ticker);
    ctx.session.currenciesTo = currencies;
    ctx.session.currencyPage = 1;
    ctx.replyWithHTML(`
    Выберите <b>валюту</b> на которую выхотите обменять ${ctx.session.from.name}.
    Досступно ${currencies.length} валют.
    `, telegraf_1.Markup.inlineKeyboard(currencyMurkup_1.currencyMurkup(currencies, ctx)).extra());
    return ctx.wizard.next();
}));
exchange.command('start', (ctx) => {
    ctx.scene.leave();
});
exports.default = exchange;
//# sourceMappingURL=exchange.js.map