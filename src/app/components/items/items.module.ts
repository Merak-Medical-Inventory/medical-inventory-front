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
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CategoriesModule} from '../categories/categories.module';
import {CategoryFormComponent} from '../categories/category-form/category-form.component';
import {BrandFormComponent} from '../brands/brand-form/brand-form.component';
import {PresentationFormComponent} from '../presentations/presentation-form/presentation-form.component';
import {BrandsModule} from '../brands/brands.module';
import {PresentationsModule} from '../presentations/presentations.module';
import {GeneralItemService} from '../../services/generalItem/general-item.service';
import {GeneralItemFormComponent} from '../generalItems/general-item-form/general-item-form.component';
import {GeneralItemsModule} from '../generalItems/general-items.module';


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
    NgSelect2Module,
    GeneralItemsModule,
    CategoriesModule,
    BrandsModule,
    PresentationsModule,
    NgbModule
  ],
  providers: [ItemService, GeneralItemService, CategoryService, BrandService, PresentationService],
  entryComponents: [GeneralItemFormComponent, CategoryFormComponent, BrandFormComponent, PresentationFormComponent]
})
export class ItemsModule { }
