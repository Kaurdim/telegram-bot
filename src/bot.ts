require('dotenv').config();

import Telegraf, { Markup, ContextMessageUpdate } from 'telegraf';
const SocksAgent = require('socks5-https-client/lib/Agent');
import session from 'telegraf/session';
import Stage from 'telegraf/stage';

import { countResponseTime } from './middelwares';
import text from './locales/ru.json';
import selectFrom from './controllers/selectFrom/selectFrom';
import selectTo from './controllers/selectTo/selectTo';
import amount from './controllers/amout';
import exchange from './controllers/exchange/exchange'
import setAddress from './controllers/setAddress';
import { connectDatabase } from './connectDatabase';
import { getAllCurrencies } from './api';
import Currencies from './models/Currencies';
import { getCurrencies } from './utils/getCurrencies';

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(session());
const stage = new Stage([
  selectFrom,
  selectTo,
  amount,
  setAddress,
  exchange
]);
bot.use(stage.middleware());

bot.use(countResponseTime);
bot.start(ctx => {
  ctx.reply(`Hello, ${ctx.from.first_name}!`,
    Markup.keyboard([
      [text.startExchange, text.history],
      [text.about, text.settings]
    ]).resize().extra()
  );
});



bot.hears(text.startExchange, (ctx: ContextMessageUpdate) => {
  ctx.scene.enter('selectFrom');
});



bot.hears(text.history, ctx => {
  ctx.scene.enter('exchange');
  ctx.reply('История транзацкций');
});

async function startBot () {
  try {
    await connectDatabase(process.env.DB_HOST, process.env.DB_PORT, process.env.DB_NAME);
    await Currencies.deleteMany({});
    const currencies = await getCurrencies();
    console.log(currencies);
  } catch (error) {
    process.exit(0);
  }
  bot.startPolling();
  console.log('Bot start!');
}

startBot();

