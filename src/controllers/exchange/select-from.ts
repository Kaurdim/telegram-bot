import { ContextMessageUpdate, Markup, Composer} from 'telegraf';
import Scene from 'telegraf/scenes/base';
import Currency from '../../models/Currencies';
import { currencyMurkup } from '../../utils/currencyMurkup';

const selectFrom = new Composer();


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
  const currency = await Currency.findOne({ ticker: ctx.match});
  ctx.session.from = currency.toObject();
  ctx.replyWithHTML(`Вы выбрали: <b>${currency.name}</b>`);
  return ctx.wizard.next();
});

// selectFrom.use(async );


export default selectFrom;