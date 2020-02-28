import { ContextMessageUpdate, Markup, CallbackButton } from 'telegraf';
import Stage from 'telegraf/stage';
import Scene from 'telegraf/scenes/base';
import { getExchAmount } from '../api';
import { validateAddress } from '../validate/validateAddress';
import { currencyMurkup } from './selectFrom/utils';

const { leave } = Stage;
const setAddress = new Scene('setAddress');

setAddress.enter(async (ctx: ContextMessageUpdate) => {
  const { to } = ctx.session;
  ctx.replyWithHTML(`Введите ${to.name} адрес кошелька получателя.`);
  ctx.replyWithHTML(`Пожалуйста будьте внимательны при вводе адреса.`);
});


setAddress.hears(/^[a-zA-Zа-яА-Я0-9]+/gi, async (ctx: ContextMessageUpdate) => {
  const address = ctx.message.text.trim();
  const { to, from, amount } = ctx.session;
  if (!address || !validateAddress(to.ticker, address)) {
    ctx.reply(`Не валидный ${to.name} адрес кошелька!`);
    ctx.scene.reenter();
    return;
  }
  ctx.session.address = address;
  try {
    console.log(amount, from.ticker, to.ticker);
    const { estimatedAmount } = await getExchAmount(amount, from.ticker, to.ticker);
    ctx.session.estimatedAmount = estimatedAmount
    ctx.replyWithHTML(
    `Вы отпраляете: ${amount} ${from.ticker.toUpperCase()}
     Вы получате: ${estimatedAmount} ${to.ticker.toUpperCase()}
     На адрес: ${address}
    `, Markup.inlineKeyboard([Markup.callbackButton('Подтверждаю', 'confirm')]).extra())
  } catch (error) {
    console.log(error);
  }
});


setAddress.action('confirm', async (ctx: ContextMessageUpdate) => {
  ctx.reply('Подтвердил');
});

export default setAddress;