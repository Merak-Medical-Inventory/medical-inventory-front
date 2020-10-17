export interface Lot {
  id: number;
  entryDate: Date;
  dueDate: Date;
  amount: number;
}

export interface LotTable {
  id: number;
  amount: number;
  entryDate: Date;
  dueDate: Date;
}

export interface LotToStock {
  id: number;
  amount: number;
  lot: Lot;
}

export interface PostLot {
    order: number;
    items: PostItemLot[];
}

export interface PostItemLot {
    id: number;
    dueDate: Date;
    amount: number;
}
