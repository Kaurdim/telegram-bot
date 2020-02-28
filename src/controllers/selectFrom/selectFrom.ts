import { ContextMessageUpdate, Markup, CallbackButton } from 'telegraf';
import Scene from 'telegraf/scenes/base';
import Currency from '../../models/Currencies';
import { currencyMurkup } from './utils';

const selectFrom = new Scene('selectFrom');

selectFrom.enter(async (ctx: ContextMessageUpdate) => {
  const currencies = await Currency.find({});
  ctx.session.currencyPage = 1;
  ctx.replyWithHTML(`
  Выберите <b>валюту</b> на которую выхотите обменять.
  Досступно валют: ${currencies.length}.
  `, Markup.inlineKeyboard(currencyMurkup(currencies, ctx)).resize().extra());
});


selectFrom.action('next', async (ctx: ContextMessageUpdate) => {
  const currencies = await Currency.find({});
  const maxPage = Number((currencies.length / 9).toFixed(0));
  ctx.session.currencyPage >= maxPage ? ctx.session.currencyPage = 1 : ctx.session.currencyPage++;
  ctx.editMessageReplyMarkup(Markup.inlineKeyboard(currencyMurkup(currencies, ctx)));
});

selectFrom.action('back', async (ctx: ContextMessageUpdate) => {
  const currencies = await Currency.find({});
  const maxPage = Number((currencies.length / 9).toFixed(0));
  ctx.session.currencyPage <= 1 ? ctx.session.currencyPage = maxPage : ctx.session.currencyPage--;
  await ctx.editMessageReplyMarkup(Markup.inlineKeyboard(currencyMurkup(currencies, ctx)));
});

selectFrom.action(/.+/, async (ctx: ContextMessageUpdate) => {
  const currency = await Currency.findOne({ ticker: ctx.match[0]});
  ctx.session.from = currency.toObject();
  ctx.replyWithHTML(`Вы выбрали: <b>${currency.name}</b>`);
  ctx.scene.leave();
  ctx.scene.enter('selectTo');
});

export default selectFrom;
