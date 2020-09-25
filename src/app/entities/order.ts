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

export interface Order {
    id: number;
    status: string;
    date: Date;
    user: User;
    provider: Provider;
    orderToItem: OrderToItem[];
}

export interface UpdateOrder {
    status: string;
}