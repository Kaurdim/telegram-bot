import { AVAILABLE_CURRENCIES } from '../constants';
import { getCurrencyInfo, getAllCurrencies } from '../api';
import Currency from '../models/Currencies';


export async function getCurrencies () {
  const disabledCurrencies: string[] = [];
  const allCurrencies = await getAllCurrencies();
  for (const currency in AVAILABLE_CURRENCIES) {
    const currencyInfo = allCurrencies.find(curr => curr.ticker === currency);
    if (!currency) {
      continue;
    }
    try {
      const { addressExplorerMask, transactionExplorerMask, isAnonymous} = await getCurrencyInfo(currency);
      await Currency.insertMany({
        ...currencyInfo,
        addressExplorerMask,
        transactionExplorerMask,
        isAnonymous
      });
    } catch (error) {
      disabledCurrencies.push(currency);
      continue;
    }
  }
  return disabledCurrencies;
}