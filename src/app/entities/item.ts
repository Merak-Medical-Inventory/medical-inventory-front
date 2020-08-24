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

export interface PostItem {
  code: string;
  brand_code: string;
  generalItem: number;
  category: number;
  brand: number;
  presentation: number;
}
