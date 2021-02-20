import {Component, Input, OnInit} from '@angular/core';
import {filterTable, paginateObject} from '../../../util';
import { getDateString } from 'src/app/util';
import {PageEvent} from '@angular/material';
import {Record, RecordTable} from '../../../entities/record';

@Component({
  selector: 'app-location-history',
  templateUrl: './location-history.component.html',
  styleUrls: ['./location-history.component.css']
})
export class LocationHistoryComponent implements OnInit {
  @Input() records: Record[];
  recordsTable: RecordTable[] = [];
  currentPageRecord: RecordTable[];
  paginatedRecords: RecordTable[][] = [];
  search = '';
  isLoading = true;
  pageSize = 10;

  constructor() { }

  ngOnInit() {
    if (this.records) {
      this.records = this.records.map(value => {
        let endDate: Date;
        if (value.endDate) {
          console.log(value.endDate);
          endDate = new Date(value.endDate);
          // @ts-ignore
          value.endDate = getDateString(endDate);
        }
        const date = new Date(value.initialDate);
        // @ts-ignore
        value.initialDate = getDateString(date);
        return value;
      });
      this.recordsTable = this.records.map(record => {
        const element: RecordTable = {
          id: record.id,
          location: record.location.name,
          initialDate: record.initialDate,
          endDate: record.endDate
        };
        return element;
      });
      this.paginatedRecords = paginateObject<RecordTable>(this.recordsTable, this.pageSize);
      this.currentPageRecord = this.paginatedRecords[0];
      this.isLoading = false;
    }
  }

  onPageRecordChanged(event: PageEvent) {
    this.currentPageRecord = this.paginatedRecords[event.pageIndex];
  }

  searchTypedRecords() {
    this.paginatedRecords = paginateObject<RecordTable>(filterTable<RecordTable>(this.recordsTable, this.search), this.pageSize);
    this.currentPageRecord = this.paginatedRecords[0];
  }

}
