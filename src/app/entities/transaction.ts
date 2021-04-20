import {User} from './user';
import {Inventory} from './inventory';
import {Item} from './item';

export interface Transaction {
  id: number;
  blockchainTx: string;
  date: Date;
  bcTransactionId: string;
  amount: number;
  sender: User;
  inventory1: Inventory;
  inventory2: Inventory;
  item: Item;
}

export interface TransactionTable {
  id: number;
  blockchainTx: string;
  date: Date;
  bcTransactionId: string;
  amount: number;
  sender: string;
  inventory1: string;
  inventory2: string;
  item: string;
}
