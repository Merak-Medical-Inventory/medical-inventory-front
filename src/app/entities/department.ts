import {Inventory} from './inventory';

export interface Department {
  id: number;
  code: string;
  name: string;
  description: string;
  inventory: Inventory;
}

export interface PostDepartment {
  code: string;
  name: string;
  description: string;
}
