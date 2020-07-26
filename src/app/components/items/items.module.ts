import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsRoutingModule } from './items-routing.module';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemFormComponent } from './item-form/item-form.component';
import {LayoutModule} from '../layout/layout.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatPaginatorModule, MatProgressSpinnerModule} from '@angular/material';
import {ItemService} from '../../services/item/item.service';
import {CategoryService} from '../../services/category/category.service';
import {BrandService} from '../../services/brand/brand.service';
import {PresentationService} from '../../services/presentation/presentation.service';
import {NgSelect2Module} from 'ng-select2';


@NgModule({
  declarations: [ItemListComponent, ItemFormComponent],
  imports: [
    CommonModule,
    ItemsRoutingModule,
    LayoutModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    NgSelect2Module
  ],
  providers: [ItemService, CategoryService, BrandService, PresentationService]
})
export class ItemsModule { }
