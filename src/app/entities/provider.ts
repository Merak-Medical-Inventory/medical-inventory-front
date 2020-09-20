import {Item} from './item';

export interface Provider {
  id: number;
  name: string;
  last_name: string;
  email: string;
  description: string;
  company: string;
  country: string;
  city: string;
  address: string;
  phone_number: string;
  items: Item[];
}

export interface PostProvider {
  name: string;
  last_name: string;
  email: string;
  description: string;
  company: string;
  country: string;
  city: string;
  address: string;
  phone_number: string;
  items: number[];
}
