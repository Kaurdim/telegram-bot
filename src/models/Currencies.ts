import mongoose, { Document } from 'mongoose';

export interface CurrencyInterface extends Document {
  ticker: string;
  name: string;
  image: string;
  hasExternalId: boolean;
  isFiat: boolean;
  featured: boolean;
  isStable: boolean;
  supportsFixedRate: boolean;
  addressExplorerMask: string,
  transactionExplorerMask: string,
  isAnonymous: boolean,
}

export const CurrencySchema = new mongoose.Schema(
  {
    ticker: String,
    name: String,
    image: String,
    hasExternalId: Boolean,
    isFiat: Boolean,
    featured: Boolean,
    isStable: Boolean,
    supportsFixedRate: Boolean,
    addressExplorerMask: String,
    transactionExplorerMask: String,
    isAnonymous: Boolean,
  }
);

const Currency = mongoose.model<CurrencyInterface>('Currency', CurrencySchema);
export default Currency;

