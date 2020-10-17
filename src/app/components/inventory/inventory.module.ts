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


@NgModule({
  declarations: [InventoryInfoComponent],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    LayoutModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    NgbModule,
    LotModule
  ],
  providers: [InventoryService],
  entryComponents: [ LotListComponent ]
})
export class InventoryModule { }
