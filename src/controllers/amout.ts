import { ContextMessageUpdate, Markup, CallbackButton } from 'telegraf';
import Stage from 'telegraf/stage';
import Scene from 'telegraf/scenes/base';
import { getMinAmount, getExchAmount } from '../api';

const { leave } = Stage;
const amount = new Scene('amount');

amount.enter(async (ctx: ContextMessageUpdate) => {
  const { to, from } = ctx.session;
  try {
    const { minAmount } = await getMinAmount(from.ticker, to.ticker);
    ctx.session.minAmount = minAmount;
    ctx.replyWithHTML(`Введите количество ${from.name} которое вы хотите обменять.
     Минимальное количество <b>${minAmount}</b>. 
    `);
  } catch (error) {
    ctx.scene.leave();
    ctx.scene.enter('selectTo');
  }
});


amount.hears(/^[a-zA-Zа-яА-Я0-9]+/gi, async (ctx: ContextMessageUpdate) => {
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
  const { estimatedAmount } = await getExchAmount(amount, from.ticker, to.ticker);
  ctx.replyWithHTML(`<b>${amount}</b> ${from.name} ~ <b>${estimatedAmount}</b> ${to.name}`);
  ctx.scene.enter('setAddress');
});


export default amount;