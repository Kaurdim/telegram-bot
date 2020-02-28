"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
function currencyMurkup(currencies, ctx) {
    const currenciesButton = [];
    let buttonGroup = [];
    const rows = 3;
    const colums = 3;
    const maxPages = Number((currencies.length / (rows * colums)).toFixed(0));
    const { currencyPage } = ctx.session;
    currencies.forEach((currency, index) => {
        const button = telegraf_1.Markup.callbackButton(`${currency.ticker.toUpperCase()}`, currency.ticker);
        buttonGroup.push(button);
        if (buttonGroup.length === colums || currencies.length - 1 === index) {
            currenciesButton.push(buttonGroup);
            buttonGroup = [];
        }
    });
    const start = (currencyPage - 1) * rows;
    const showCurrenciesButton = currenciesButton.slice(start, start + rows);
    return [
        ...showCurrenciesButton,
        [
            telegraf_1.Markup.callbackButton(`◀️ ${currencyPage - 1 <= 0 ? maxPages : currencyPage - 1}/${maxPages}`, 'back'),
            telegraf_1.Markup.callbackButton(`${currencyPage + 1 > maxPages ? 1 : currencyPage + 1}/${maxPages} ▶️`, 'next')
        ]
    ];
}
exports.currencyMurkup = currencyMurkup;
;
//# sourceMappingURL=utils.js.map