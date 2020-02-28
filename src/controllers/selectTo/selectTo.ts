import { ContextMessageUpdate, Markup, CallbackButton } from 'telegraf';
import Stage from 'telegraf/stage';
import Scene from 'telegraf/scenes/base';
import { getPairsForCurency } from '../../api';
import { currencyMurkup } from '../selectFrom/utils';

const { leave } = Stage;
const selectTo = new Scene('selectTo');

selectTo.enter(async (ctx: ContextMessageUpdate) => {
  const currencies = await getPairsForCurency(ctx.session.from.ticker);
  ctx.session.currenciesTo = currencies;
  ctx.session.currencyPage = 1;
  ctx.replyWithHTML(`
  Выберите <b>валюту</b> на которую выхотите обменять ${ctx.session.from.name}.
  Досступно ${currencies.length} валют.
  `, Markup.inlineKeyboard(currencyMurkup(currencies, ctx)).extra());
});


selectTo.action('next', async (ctx: ContextMessageUpdate) => {
  const currencies = ctx.session.currenciesTo;
  const maxPage = Number((currencies.length / 9).toFixed(0));
  ctx.session.currencyPage >= maxPage ? ctx.session.currencyPage = 1 : ctx.session.currencyPage++;
  ctx.editMessageReplyMarkup(Markup.inlineKeyboard(currencyMurkup(currencies, ctx)));
});

selectTo.action('back', async (ctx: ContextMessageUpdate) => {
  const currencies = ctx.session.currenciesTo;
  const maxPage = Number((currencies.length / 9).toFixed(0));
  ctx.session.currencyPage <= 1 ? ctx.session.currencyPage = maxPage : ctx.session.currencyPage--;
  await ctx.editMessageReplyMarkup(Markup.inlineKeyboard(currencyMurkup(currencies, ctx)));
});

selectTo.action(/.+/, async (ctx: ContextMessageUpdate) => {
  const currency = ctx.session.currenciesTo.find(cur => cur.ticker === ctx.match[0]);
  ctx.session.to = currency;
  ctx.replyWithHTML(`Вы выбрали: <b>${currency.name}</b>`);
  ctx.scene.leave();
  ctx.scene.enter('amount');
});


export default selectTo;
