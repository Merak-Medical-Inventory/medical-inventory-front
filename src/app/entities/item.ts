import {Category} from './category';
import {Brand} from './brand';
import {Presentation} from './presentation';

export interface Item {
  id: number;
  code: string;
  name: string;
  description: string;
  brand_code: string;
  category: Category;
  brand: Brand;
  presentation: Presentation;
}

export interface PostItem {
  code: string;
  name: string;
  description: string;
  brand_code: string;
  category: number;
  brand: number;
  presentation: number;
}
