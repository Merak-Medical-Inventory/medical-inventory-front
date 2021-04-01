import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryInfoComponent } from './inventory-info/inventory-info.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LayoutModule} from '../layout/layout.module';
import {MatPaginatorModule, MatProgressSpinnerModule} from '@angular/material';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LotModule} from '../lot/lot.module';
import {InventoryService} from '../../services/inventory/inventory.service';
import {LotListComponent} from '../lot/lot-list/lot-list.component';
import {StockCriticUnitComponent} from './stock-critic-unit/stock-critic-unit.component';
import {StockService} from '../../services/stock/stock.service';
import {NgSelect2Module} from 'ng-select2';


@NgModule({
  declarations: [InventoryInfoComponent, StockCriticUnitComponent],
    imports: [
        CommonModule,
        InventoryRoutingModule,
        LayoutModule,
        FormsModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        NgbModule,
        LotModule,
        NgSelect2Module
    ],
  providers: [InventoryService, StockService],
  entryComponents: [ LotListComponent, StockCriticUnitComponent]
})
export class InventoryModule { }
