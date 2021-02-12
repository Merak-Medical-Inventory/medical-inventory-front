import {Device} from './device';

export interface Maintenance {
  id: number;
  description: string;
  date: Date;
  device: Device;
}

export interface MaintenanceTable {
  id: number;
  description: string;
  date: Date;
  device: string;
}

export interface PostMaintenance {
  id: number;
  description: string;
  date: Date;
  device: number;
}

