import mongoose, { Document } from 'mongoose';

export interface TransactionInterface extends Document {
  _id: string;
  payinAddress: string;
  payoutAddress: string;
  postepayoutExtraIdrUrl: string;
  fromCurrency: string;
  toCurrency: string;
  refundAddress: string;
  refundExtraId: string;
  amount: number;
  userId: string;
}

export const TransactionSchema = new mongoose.Schema(
  {
    _id: String,
    payinAddress: String,
    payoutAddress: String,
    postepayoutExtraIdrUrl: String,
    fromCurrency: String,
    toCurrency: String,
    refundAddress: String,
    refundExtraId: String,
    amount: Number,
    userId: String 
  },
  { _id: false }
);

const Transaction = mongoose.model<TransactionInterface>('Transaction', TransactionSchema);
export default Transaction;

