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
const stage_1 = __importDefault(require("telegraf/stage"));
const base_1 = __importDefault(require("telegraf/scenes/base"));
const api_1 = require("../api");
const { leave } = stage_1.default;
const amount = new base_1.default('amount');
amount.enter((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { to, from } = ctx.session;
    try {
        const { minAmount } = yield api_1.getMinAmount(from.ticker, to.ticker);
        ctx.session.minAmount = minAmount;
        ctx.replyWithMarkdown(`
    Введите количество ${from.name} которое вы хотите обменять.
    Минимальное количество *${minAmount}*.`);
    }
    catch (error) {
        ctx.scene.leave();
        ctx.scene.enter('selectTo');
    }
}));
amount.hears(/^[a-zA-Zа-яА-Я0-9]+/gi, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const amount = Number(ctx.message.text.replace(',', '.'));
    const { from, to, minAmount } = ctx.session;
    if (!amount || isNaN(amount)) {
        ctx.reply('Количество должно быть числом!');
        ctx.scene.reenter();
        return;
    }
    if (amount < minAmount) {
        ctx.reply('Количество меньше минимального!');
        ctx.scene.reenter();
        return;
    }
    ctx.session.amount = amount;
    const { estimatedAmount } = yield api_1.getExchAmount(amount, from.ticker, to.ticker);
    ctx.replyWithHTML(`<b>${amount}</b> ${from.name} ~ <b>${estimatedAmount}</b> ${to.name}`);
    ctx.scene.enter('setAddress');
}));
exports.default = amount;
//# sourceMappingURL=amout.js.map