import {Item} from './item';

export interface Provider {
  id: number;
  name: string;
  last_name: string;
  company: string;
  phone_number: string;
  items: Item[];
}

export interface PostProvider {
  name: string;
  last_name: string;
  company: string;
  phone_number: string;
  items: number[];
}
