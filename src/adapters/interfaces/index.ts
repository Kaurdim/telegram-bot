export interface ILimits {
  currencyFrom: string;
  currencyTo: string;
  min: number | null;
  max: number | null;
}

export interface IEstimate {
  currencyFrom: string;
  currencyTo: string;
  amountFrom: number | null;
  amountTo: number | null;
}

export interface ITxParams {
  currencyFrom: string;
  currencyTo: string;
  amount: number;
  addressReceive: string;
  exctraId?: string;
}

export interface ITransaction {

}

export interface TxInfo {
  
}

export interface IAdapter {
  key: string;
  getCurrencies: () => Promise<string[]>;
  getLimits: (currencyFrom: string, currencyTo: string) => Promise<ILimits>;
  getEstimate: (currencyFrom: string, currencyTo: string, amount: number) => Promise<IEstimate>;
  createTx: (params: ITxParams) => Promise<ITransaction>;
  getTx: (txId: string) => Promise<TxInfo>;
}