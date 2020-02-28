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
const Currencies_1 = __importDefault(require("../../models/Currencies"));
const currencyMurkup_1 = require("../../utils/currencyMurkup");
const selectFrom = new telegraf_1.Composer();
selectFrom.action('next', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const currencies = yield Currencies_1.default.find({});
    const maxPage = Number((currencies.length / 9).toFixed(0));
    ctx.session.currencyPage >= maxPage ? ctx.session.currencyPage = 1 : ctx.session.currencyPage++;
    ctx.editMessageReplyMarkup(telegraf_1.Markup.inlineKeyboard(currencyMurkup_1.currencyMurkup(currencies, ctx)));
}));
selectFrom.action('back', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const currencies = yield Currencies_1.default.find({});
    const maxPage = Number((currencies.length / 9).toFixed(0));
    ctx.session.currencyPage <= 1 ? ctx.session.currencyPage = maxPage : ctx.session.currencyPage--;
    yield ctx.editMessageReplyMarkup(telegraf_1.Markup.inlineKeyboard(currencyMurkup_1.currencyMurkup(currencies, ctx)));
}));
selectFrom.action(/.+/, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const currency = yield Currencies_1.default.findOne({ ticker: ctx.match });
    ctx.session.from = currency.toObject();
    ctx.replyWithHTML(`Вы выбрали: <b>${currency.name}</b>`);
    return ctx.wizard.next();
}));
// selectFrom.use(async );
exports.default = selectFrom;
//# sourceMappingURL=select-from.js.map