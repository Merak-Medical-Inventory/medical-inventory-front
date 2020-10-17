import {Component, Input, OnInit} from '@angular/core';
import {LotTable, LotToStock} from '../../../entities/lot';
import {filterTable, paginateObject} from '../../../util';
import { getDateString } from 'src/app/util';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-lot-list',
  templateUrl: './lot-list.component.html',
  styleUrls: ['./lot-list.component.css']
})
export class LotListComponent implements OnInit {
  @Input() lots: LotToStock[];
  lotsTable: LotTable[] = [];
  currentPageLot: LotTable[];
  paginatedLots: LotTable[][] = [];
  search = '';
  isLoading = true;
  pageSize = 10;

  constructor() { }

  ngOnInit() {
    if (this.lots) {
      this.lots = this.lots.map(value => {
        let dueDate: Date;
        if (value.lot.dueDate) {
          console.log(value.lot.dueDate);
          dueDate = new Date(value.lot.dueDate);
          // @ts-ignore
          value.lot.dueDate = getDateString(dueDate);
        }
        const date = new Date(value.lot.entryDate);
        // @ts-ignore
        value.lot.entryDate = getDateString(date);
        return value;
      });
      this.lotsTable = this.lots.map(lot => {
        const element: LotTable = {
          id: lot.id,
          amount: lot.amount,
          entryDate: lot.lot.entryDate,
          dueDate: lot.lot.dueDate
        };
        return element;
      });
      this.paginatedLots = paginateObject<LotTable>(this.lotsTable, this.pageSize);
      this.currentPageLot = this.paginatedLots[0];
      this.isLoading = false;
    }
  }

  onPageLotChanged(event: PageEvent) {
    this.currentPageLot = this.paginatedLots[event.pageIndex];
  }

  searchTypedLots() {
    this.paginatedLots = paginateObject<LotTable>(filterTable<LotTable>(this.lotsTable, this.search), this.pageSize);
    this.currentPageLot = this.paginatedLots[0];
  }

}
