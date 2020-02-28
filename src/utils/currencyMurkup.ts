import { Markup, CallbackButton, ContextMessageUpdate } from 'telegraf';
import { CurrencyInterface } from '../models/Currencies';

export function currencyMurkup (
  currencies: CurrencyInterface[],
  ctx: ContextMessageUpdate) {

  const currenciesButton: CallbackButton[][] = [];
  let buttonGroup:CallbackButton[] = [];
  const rows = 3;
  const colums = 3;
  const maxPages = Number((currencies.length / (rows * colums)).toFixed(0));
  const { currencyPage } = ctx.session;
  
  currencies.forEach((currency, index) => {
    const button = Markup.callbackButton(`${currency.ticker.toUpperCase()}`, currency.ticker);
    buttonGroup.push(button);
    if(buttonGroup.length === colums || currencies.length - 1 === index ) {
      currenciesButton.push(buttonGroup);
      buttonGroup = [];
    }
  });
  const start = (currencyPage -1) * rows;
  const showCurrenciesButton = currenciesButton.slice(start, start + rows);
  return [
    ...showCurrenciesButton,
    [
      Markup.callbackButton(`◀️ ${currencyPage -1 <= 0 ? maxPages : currencyPage -1}/${maxPages}`, 'back'),
      Markup.callbackButton(`${currencyPage + 1 > maxPages ? 1 : currencyPage + 1}/${maxPages} ▶️`, 'next')
    ]
  ];
};