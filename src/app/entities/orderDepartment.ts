import {OrderToItem, PostItemOrder} from './order';
import {User} from './user';
import {Department} from './department';

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

