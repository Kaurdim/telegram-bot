
require('dotenv').config();
import rp, { Options } from 'request-promise';
import { CurrencyInterface } from './models/Currencies';
const API_KEY = process.env.CHANGE_NOW_API_KEY;
const API_URL = 'https://changenow.io/api/v1'

interface Currency extends CurrencyInterface {
}

interface estimateAmount {
  estimatedAmount: number;
  transactionSpeedForecast: string;
}

const _apiRequest = async (options: Options) => {
  try {
    const resp = await rp(options);
    return resp;
  }
  catch (err) {
    console.log(err.error.error);
    throw new Error(err.error.error);
  }
}

export const getAllCurrencies = async (): Promise<Currency[]> => {
  const options = {
    uri: `${API_URL}/currencies?active=true`,
    json: true
  };
  return await _apiRequest(options);
}

export const getPairsForCurency = async (ticker: string): Promise<Currency[]> => {
  const options = {
    uri: `${API_URL}/currencies-to/${ticker}?active=true`,
    json: true
  }
  return await _apiRequest(options);
}

export const getPairs = async (): Promise<[]> => {
  const options = {
    uri: `${API_URL}/market-info/available-pairs/?api_key=${API_KEY}`,
    json: true
  };
  return await _apiRequest(options);
}

export const getMinAmount = async (from: string, to: string): Promise<{ minAmount :number }> => {
  const options = {
    uri: `${API_URL}/min-amount/${from}_${to}`,
    json: true
  };
  return await _apiRequest(options);
}


export const getCurrencyInfo = async (tiker:string):
  Promise<{ 
    addressExplorerMask: string,
    transactionExplorerMask: string,
    isAnonymous: boolean,
  }> => {
  const options = {
    uri: `${API_URL}/currencies/${tiker}?api_key=${API_KEY}`,
    json: true
  };
  const currency = await _apiRequest(options);
  return currency;
}

export const getExchAmount = async (amount: number, from: string, to:string): Promise<estimateAmount> => {
  const options = {
    uri: `${API_URL}/exchange-amount/${amount}/${from}_${to}?api_key=${API_KEY}`,
    json: true
  };
  return await _apiRequest(options);
  
}

export const createTransaction = async (data: {}) => {
  const options = {
    method: 'POST',
    uri: `${API_URL}/transactions/${API_KEY}`,
    body: data,
    json: true
  };
  return await _apiRequest(options);
  
}

export const getTransactionStatus = async (id: string) => {
  const options = {
    uri: `${API_URL}/transactions/${id}/${API_KEY}`,
    json: true
  }
  return await _apiRequest(options);
}
