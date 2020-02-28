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
const api_1 = require("../api");
const validateAddress_1 = require("../validate/validateAddress");
const { leave } = stage_1.default;
const setAddress = new base_1.default('setAddress');
setAddress.enter((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { to } = ctx.session;
    ctx.replyWithHTML(`Введите ${to.name} адрес кошелька получателя.`);
    ctx.replyWithHTML(`Пожалуйста будьте внимательны при вводе адреса.`);
}));
setAddress.hears(/^[a-zA-Zа-яА-Я0-9]+/gi, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const address = ctx.message.text.trim();
    const { to, from, amount } = ctx.session;
    if (!address || !validateAddress_1.validateAddress(to.ticker, address)) {
        ctx.reply(`Не валидный ${to.name} адрес кошелька!`);
        ctx.scene.reenter();
        return;
    }
    ctx.session.address = address;
    try {
        console.log(amount, from.ticker, to.ticker);
        const { estimatedAmount } = yield api_1.getExchAmount(amount, from.ticker, to.ticker);
        ctx.session.estimatedAmount = estimatedAmount;
        ctx.replyWithHTML(`Вы отпраляете: ${amount} ${from.ticker.toUpperCase()}
    Вы получате: ${estimatedAmount} ${to.ticker.toUpperCase()}
    На адрес: ${address}
    `, telegraf_1.Markup.inlineKeyboard([telegraf_1.Markup.callbackButton('Подтверждаю', 'confirm')]).extra());
    }
    catch (error) {
        console.log(error);
    }
}));
setAddress.action('confirm', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.reply('Подтвердил');
}));
exports.default = setAddress;
//# sourceMappingURL=setAddress.js.map