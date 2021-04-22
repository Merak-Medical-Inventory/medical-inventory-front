import {User} from './user';
import {Inventory} from './inventory';
import {Device} from './device';

export interface DeviceTransaction {
  id: number;
  blockchainTx: string;
  date: Date;
  bcTransactionId: string;
  sender: User;
  inventory1: Inventory;
  inventory2: Inventory;
  device: Device;
}

export interface DeviceTransactionTable {
  id: number;
  blockchainTx: string;
  date: Date;
  bcTransactionId: string;
  inventory1: string;
  inventory2: string;
  device: string;
}
