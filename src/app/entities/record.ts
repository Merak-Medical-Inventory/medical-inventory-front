import {Inventory} from './inventory';
import {Device} from './device';

export interface Record {
  initialDate: Date;
  endDate: Date;
  device: Device;
  location: Inventory;
}

export interface RecordTable {
  initialDate: Date;
  endDate: Date;
  device: string;
  location: string;
}
