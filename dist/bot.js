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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const telegraf_1 = __importStar(require("telegraf"));
const SocksAgent = require('socks5-https-client/lib/Agent');
const session_1 = __importDefault(require("telegraf/session"));
const stage_1 = __importDefault(require("telegraf/stage"));
const middelwares_1 = require("./middelwares");
const ru_json_1 = __importDefault(require("./locales/ru.json"));
const selectFrom_1 = __importDefault(require("./controllers/selectFrom/selectFrom"));
const selectTo_1 = __importDefault(require("./controllers/selectTo/selectTo"));
const amout_1 = __importDefault(require("./controllers/amout"));
const exchange_1 = __importDefault(require("./controllers/exchange/exchange"));
const setAddress_1 = __importDefault(require("./controllers/setAddress"));
const connectDatabase_1 = require("./connectDatabase");
const Currencies_1 = __importDefault(require("./models/Currencies"));
const getCurrencies_1 = require("./utils/getCurrencies");
const bot = new telegraf_1.default(process.env.BOT_TOKEN);
bot.use(session_1.default());
const stage = new stage_1.default([
    selectFrom_1.default,
    selectTo_1.default,
    amout_1.default,
    setAddress_1.default,
    exchange_1.default
]);
bot.use(stage.middleware());
bot.use(middelwares_1.countResponseTime);
bot.start(ctx => {
    ctx.reply(`Hello, ${ctx.from.first_name}!`, telegraf_1.Markup.keyboard([
        [ru_json_1.default.startExchange, ru_json_1.default.history],
        [ru_json_1.default.about, ru_json_1.default.settings]
    ]).resize().extra());
});
bot.hears(ru_json_1.default.startExchange, (ctx) => {
    ctx.scene.enter('selectFrom');
});
bot.hears(ru_json_1.default.history, ctx => {
    ctx.scene.enter('exchange');
    ctx.reply('История транзацкций');
});
function startBot() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connectDatabase_1.connectDatabase(process.env.DB_HOST, process.env.DB_PORT, process.env.DB_NAME);
            yield Currencies_1.default.deleteMany({});
            const currencies = yield getCurrencies_1.getCurrencies();
            console.log(currencies);
            // await Currencies.insertMany(currencies);
        }
        catch (error) {
            process.exit(0);
        }
        bot.startPolling();
        console.log('Bot start!');
    });
}
startBot();
//# sourceMappingURL=bot.js.map