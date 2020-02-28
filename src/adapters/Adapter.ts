
export abstract class Adapter {
  readonly key: string;
  constructor(key: string) {
    this.key = key;
  }

  public async getCurrencies() {
    const currencies = await this.getCoins();
  }

}