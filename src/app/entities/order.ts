import { User } from './user';
import { Provider } from './provider';
import { Item } from './item';


export interface PostItemOrder {
    id: number;
    amount: number;
}

export interface PostOrder {
    user: number;
    provider: number;
    items: PostItemOrder[];
}

export interface OrderToItem {
    item: Item;
    amount: number;
}

export interface OrderToItemTable {
  amount: number;
  code: string;
  brand_code: string;
  generalItem: string;
  category: string;
  brand: string;
  presentation: string;
}

export interface Order {
    id: number;
    status: string;
    date: Date;
    user: User;
    provider: Provider;
    orderToItem: OrderToItem[];
}

export interface OrderTable {
  id: number;
  status: string;
  date: Date;
  user: User;
  provider: string;
  orderToItem: OrderToItem[];
}

export interface UpdateOrder {
    status: string;
}
