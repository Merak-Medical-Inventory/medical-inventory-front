import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralItemsRoutingModule } from './general-items-routing.module';
import { GeneralItemListComponent } from './general-item-list/general-item-list.component';
import {GeneralItemFormComponent} from './general-item-form/general-item-form.component';
import {LayoutModule} from '../layout/layout.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatPaginatorModule, MatProgressSpinnerModule} from '@angular/material';
import {GeneralItemService} from '../../services/generalItem/general-item.service';


@NgModule({
  declarations: [GeneralItemListComponent, GeneralItemFormComponent],
  imports: [
    CommonModule,
    GeneralItemsRoutingModule,
    LayoutModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    ReactiveFormsModule
  ],
  providers: [GeneralItemService]
})
export class GeneralItemsModule { }
