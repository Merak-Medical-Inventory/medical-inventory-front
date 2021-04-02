import {Item} from './item';
import {LotToStock} from './lot';

export interface Inventory {
  id: number;
  name: string;
  description: string;
  stock: Stock[];
}

export interface Stock {
  id: number;
  amount: number;
  criticUnit: number;
  item: Item;
  LotToStock: LotToStock[];
}

export interface StockTable {
  id: number;
  amount: number;
  criticUnit: number;
  LotToStock: LotToStock[];
  code: string;
  brand_code: string;
  generalItem: string;
  category: string;
  brand: string;
  presentation: string;
  status: string;
}

export interface UpdateStock {
  criticUnit: number;
}

export interface OutputItemStock {
  amountOutput: number;
}
