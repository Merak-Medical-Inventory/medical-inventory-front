export interface PostLot {
    order: number;
    items: ItemLot[];
}

export interface ItemLot {
    id : number;
    dueDate : Date;
    amount : number;
}