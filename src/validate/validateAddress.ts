import currenciesRules from '../validate/currencies-regex.json';

export const validateAddress = (currency: string, address: string) => {
  if (currenciesRules[currency.toLowerCase()]) {
    const matches = address.match(currenciesRules[currency.toLowerCase()].regEx);
    if (matches) {
      return true;
    }
  }
  return false;
}
