import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatPaginatorModule, MatProgressSpinnerModule} from '@angular/material';
import {LayoutModule} from '../layout/layout.module';
import { CategoryFormComponent } from './category-form/category-form.component';
import {CategoryService} from '../../services/category/category.service';


@NgModule({
  declarations: [CategoryListComponent, CategoryFormComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    LayoutModule,
    ReactiveFormsModule,

  ],
  providers: [CategoryService]
})
export class CategoriesModule { }
