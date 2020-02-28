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
const stage_1 = __importDefault(require("telegraf/stage"));
const base_1 = __importDefault(require("telegraf/scenes/base"));
const api_1 = require("../../api");
const utils_1 = require("../selectFrom/utils");
const { leave } = stage_1.default;
const selectTo = new base_1.default('selectTo');
selectTo.enter((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const currencies = yield api_1.getPairsForCurency(ctx.session.from.ticker);
    ctx.session.currenciesTo = currencies;
    ctx.session.currencyPage = 1;
    ctx.replyWithHTML(`
  Выберите <b>валюту</b> на которую выхотите обменять ${ctx.session.from.name}.
  Досступно ${currencies.length} валют.
  `, telegraf_1.Markup.inlineKeyboard(utils_1.currencyMurkup(currencies, ctx)).extra());
}));
selectTo.action('next', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const currencies = ctx.session.currenciesTo;
    const maxPage = Number((currencies.length / 9).toFixed(0));
    ctx.session.currencyPage >= maxPage ? ctx.session.currencyPage = 1 : ctx.session.currencyPage++;
    ctx.editMessageReplyMarkup(telegraf_1.Markup.inlineKeyboard(utils_1.currencyMurkup(currencies, ctx)));
}));
selectTo.action('back', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const currencies = ctx.session.currenciesTo;
    const maxPage = Number((currencies.length / 9).toFixed(0));
    ctx.session.currencyPage <= 1 ? ctx.session.currencyPage = maxPage : ctx.session.currencyPage--;
    yield ctx.editMessageReplyMarkup(telegraf_1.Markup.inlineKeyboard(utils_1.currencyMurkup(currencies, ctx)));
}));
selectTo.action(/.+/, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const currency = ctx.session.currenciesTo.find(cur => cur.ticker === ctx.match[0]);
    ctx.session.to = currency;
    ctx.replyWithHTML(`Вы выбрали: <b>${currency.name}</b>`);
    ctx.scene.leave();
    ctx.scene.enter('amount');
}));
exports.default = selectTo;
//# sourceMappingURL=selectTo.js.map