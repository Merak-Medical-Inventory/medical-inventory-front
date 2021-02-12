import {Brand} from './brand';
import {GeneralDevice} from './generalDevice';
import {Inventory} from './inventory';
import {Maintenance} from './maintenance';
import {Record} from './record';
import {Maker} from './maker';

export interface Device {
  id: number;
  serial_code: string;
  power_supply: string;
  date: Date;
  warranty_date: Date;
  production_year: number;
  generalDevice: GeneralDevice;
  maker: Maker;
  brand: Brand;
  Maintenance: Maintenance[];
  location: Inventory;
  Record: Record[];
}

export  interface DeviceTable {
  id: number;
  serial_code: string;
  power_supply: string;
  date: Date;
  warranty_date: Date;
  production_year: number;
  generalDevice: string;
  maker: string;
  brand: string;
  Maintenance: Maintenance[];
  location: string;
  Record: Record[];
}

export interface PostDevice {
  serial_code: string;
  power_supply: string;
  date: Date;
  warranty_date: Date;
  production_year: number;
  generalDevice: number;
  maker: number;
  brand: number;
  location: number;
}

export interface UpdateDevice {
  serial_code: string;
  power_supply: string;
  date: Date;
  warranty_date: Date;
  production_year: number;
  generalDevice: number;
  maker: number;
  brand: number;
}

export interface UpdateLocationDevice {
  idInventory: number;
}
