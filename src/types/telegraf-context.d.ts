import telegraf from 'telegraf';
import { CurrencyInterface } from '../models/Currencies';

declare module 'telegraf' {
  interface ContextMessageUpdate {
    scene: any;
    wizard: any;
    currencies: CurrencyInterface[];
    session: {
      from: CurrencyInterface,
      to: CurrencyInterface,
      amount: number,
      estimatedAmount: number,
      minAmount: number,
      address: string,
      currenciesTo: CurrencyInterface[],
      currencyPage: number,
      language: 'en' | 'ru';
    };
    movie: any;
    webhookReply: boolean;
  }
}
