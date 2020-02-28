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
const base_1 = __importDefault(require("telegraf/scenes/base"));
const api_1 = require("../api");
const createExchange = new base_1.default('createExchange');
createExchange.enter((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { to, from, amount, address } = ctx.session;
    try {
        const { minAmount } = yield api_1.createTransaction({});
        ctx.session.minAmount = minAmount;
        ctx.replyWithHTML(`Введите количество ${from.name} которое вы хотите обменять.
     Минимальное количество <b>${minAmount}</b>. 
    `);
    }
    catch (error) {
        ctx.scene.leave();
        ctx.scene.enter('selectTo');
    }
}));
exports.default = createExchange;
//# sourceMappingURL=createTransaction.js.map