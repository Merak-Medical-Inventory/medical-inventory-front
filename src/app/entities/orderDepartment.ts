import {OrderToItem, PostItemOrder} from './order';
import {User} from './user';
import {Department} from './department';
import {Item} from './item';

export interface PostOrderDepartment {
  transmitter: number;
  items: PostItemOrder[];
}

export interface OrdersByDepartment {
  id: number;
  code: string;
  name: string;
  description: string;
  orderDepartment: OrderDepartment[];
}
export interface OrderDepartment {
  id: number;
  status: string;
  date: Date;
  dateResponse: Date;
  department: Department;
  transmitter: User;
  sender: User;
  OrderDepartmentToItem: OrderToItem[];
}

export interface OrderDepartmentTable {
  id: number;
  status: string;
  date: Date;
  dateResponse: Date;
  transmitter: string;
  sender: string;
  orderToItem: OrderToItem[];
}

export interface OrderDepartmentAdminTable {
  id: number;
  status: string;
  date: Date;
  dateResponse: Date;
  department: string;
  transmitter: string;
  sender: string;
  orderToItem: OrderToItem[];
}

export interface DeniedOrderDepartment {
  response: string;
  status: string;
  sender: number;
  dateResponse: Date;
}

export interface StockForOrder {
  actualAmount: number;
  canSupply: boolean;
  item: Item;
  orderAmount: number;
}

export interface StockForOrderTable {
  actualAmount: number;
  id: number;
  code: string;
  brand_code: string;
  generalItem: string;
  category: string;
  brand: string;
  presentation: string;
  orderAmount: number;
  availableAmount: number;
}

export interface AcceptOrderDepartment {
  message: string;
  sender: number;
  items: PostItemOrder[];
}
