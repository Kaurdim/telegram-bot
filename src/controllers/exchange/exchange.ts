import { ContextMessageUpdate, Markup, Composer} from 'telegraf';
import WizardScene from 'telegraf/scenes/wizard';
import { currencyMurkup } from '../../utils/currencyMurkup';
import Currency from '../../models/Currencies';
import selectFrom from './select-from';
import { getPairsForCurency } from '../../api';

const exchange = new WizardScene('exchange',
  async (ctx: ContextMessageUpdate) => {
    ctx.reply('oben')
    const currencies = await Currency.find({});
    ctx.session.currencyPage = 1;
    ctx.replyWithHTML(`
    Выберите <b>валюту</b> на которую выхотите обменять.
    Досступно валют: ${currencies.length}.
    `, Markup.inlineKeyboard(currencyMurkup(currencies, ctx)).resize().extra());
    return ctx.wizard.next();
  },
  selectFrom,
  async (ctx: ContextMessageUpdate) => {
    const currencies = await getPairsForCurency(ctx.session.from.ticker);
    ctx.session.currenciesTo = currencies;
    ctx.session.currencyPage = 1;
    ctx.replyWithHTML(`
    Выберите <b>валюту</b> на которую выхотите обменять ${ctx.session.from.name}.
    Досступно ${currencies.length} валют.
    `, Markup.inlineKeyboard(currencyMurkup(currencies, ctx)).extra());
    return ctx.wizard.next();
  }
)

exchange.command('start', (ctx: ContextMessageUpdate) => {
  ctx.scene.leave();
});

export default exchange;