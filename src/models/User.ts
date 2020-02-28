import mongoose, { Document } from 'mongoose';
import { TransactionInterface } from './Transaction';

export interface UserInterface extends Document {
  _id: string;
  created: number;
  name: string;
  username: string;
  observableMovies: TransactionInterface[];
  language: 'en' | 'ru';
}

export const UserSchema = new mongoose.Schema(
  {
    _id: String,
    created: Number,
    name: String,
    username: String,
    observableMovies: [
      {
        _id: String,
      }
    ],
    language: String,
  },
  { _id: false }
);


const User = mongoose.model<UserInterface>('User', UserSchema);
export default User;