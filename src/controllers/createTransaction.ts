import { ContextMessageUpdate, Markup, CallbackButton } from 'telegraf';
import Stage from 'telegraf/stage';
import Scene from 'telegraf/scenes/base';
import { createTransaction } from '../api';

const createExchange = new Scene('createExchange');

createExchange.enter(async (ctx: ContextMessageUpdate) => {
  const { to, from, amount, address } = ctx.session;
  try {
    const { minAmount } = await createTransaction({});
    ctx.session.minAmount = minAmount;
    ctx.replyWithHTML(`Введите количество ${from.name} которое вы хотите обменять.
     Минимальное количество <b>${minAmount}</b>. 
    `);
  } catch (error) {
    ctx.scene.leave();
    ctx.scene.enter('selectTo');
  }
});


export default createExchange;