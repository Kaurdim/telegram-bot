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
const Currencies_1 = __importDefault(require("../../models/Currencies"));
const utils_1 = require("./utils");
const { leave } = stage_1.default;
const startExchange = new base_1.default('startExchange');
startExchange.enter((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const currencies = yield Currencies_1.default.find({});
    ctx.session.currencyPage = 1;
    ctx.currencies = currencies;
    ctx.replyWithHTML(`
  Выберите <b>валюту</b> которую выхотите обменять.
  Либо отправтье название валюты которую хотите обменять.
  Досступно ${currencies.length} валют.
  `, telegraf_1.Markup.inlineKeyboard(utils_1.currencyMurkup(currencies, ctx)).resize().extra());
}));
startExchange.action('next', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const currencies = yield Currencies_1.default.find({});
    const maxPage = Number((currencies.length / 9).toFixed(0));
    ctx.session.currencyPage >= maxPage ? ctx.session.currencyPage = 1 : ctx.session.currencyPage++;
    console.log(ctx.session.currencyPage);
    ctx.editMessageReplyMarkup(telegraf_1.Markup.inlineKeyboard(utils_1.currencyMurkup(currencies, ctx)));
}));
startExchange.action('back', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const currencies = yield Currencies_1.default.find({});
    const maxPage = Number((currencies.length / 9).toFixed(0));
    ctx.session.currencyPage <= 1 ? ctx.session.currencyPage = maxPage : ctx.session.currencyPage--;
    console.log(ctx.session.currencyPage);
    yield ctx.editMessageReplyMarkup(telegraf_1.Markup.inlineKeyboard(utils_1.currencyMurkup(currencies, ctx)));
}));
startExchange.action(/.+/, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(ctx.match[0]);
    const currency = yield Currencies_1.default.findOne({ ticker: ctx.match[0] });
    ctx.session.from = currency.toObject();
    ctx.replyWithHTML(`Вы выбрали: <b>${currency.name}</b>`);
}));
// startExchange.on('text', async (ctx: ContextMessageUpdate) => {
//   const currencies = await Currency.find({});
//   const currencyText = ctx.message.text.trim();
//   let isCoincides = false;
//   currencies.forEach((currency, index) => {
//     const { name, ticker } = currency;
//     isCoincides = name.toLowerCase().indexOf(currencyText) > -1 ||
//     ticker.toLowerCase().indexOf(currencyText) > -1;
//     if (isCoincides) {
//     }
//   });
// });
exports.default = startExchange;
//# sourceMappingURL=startExchange.js.map