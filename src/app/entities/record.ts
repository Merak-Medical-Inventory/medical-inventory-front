import {Inventory} from './inventory';

export interface Record {
  id: number;
  initialDate: Date;
  endDate: Date;
  location: Inventory;
}

export interface RecordTable {
  id: number;
  initialDate: Date;
  endDate: Date;
  location: string;
}
