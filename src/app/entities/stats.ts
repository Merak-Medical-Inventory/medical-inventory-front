import {Item} from './item';

export interface PostDeviceAgeStats {
  asc: boolean;
}

export interface DeviceAgeStatsTable {
  id: number;
  serial_code: string;
  date: Date;
  production_year: number;
  generalDevice: string;
}

export interface PostDepartmentOrderStats {
  order: string;
}

export interface DepartmentOrderStatsTable {
  orders: number;
  id: number;
  code: string;
  name: string;
  description: string;
}

export interface ItemDepartmentOrderStats {
  orders: number;
  total: number;
  item: Item;
}

export interface ItemDepartmentOrderStatsTable {
  orders: number;
  total: number;
  name: string;
}
