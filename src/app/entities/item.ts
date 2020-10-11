import {Category} from './category';
import {Brand} from './brand';
import {Presentation} from './presentation';
import {GeneralItem} from './generalItem';

export interface Item {
  id: number;
  code: string;
  brand_code: string;
  generalItem: GeneralItem;
  category: Category;
  brand: Brand;
  presentation: Presentation;
}

export  interface ItemTable {
  id: number;
  code: string;
  brand_code: string;
  generalItem: string;
  category: string;
  brand: string;
  presentation: string;
}

export interface PostItem {
  code: string;
  brand_code: string;
  generalItem: number;
  category: number;
  brand: number;
  presentation: number;
}
