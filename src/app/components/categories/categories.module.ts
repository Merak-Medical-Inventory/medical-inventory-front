import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FilterTablePipe} from '../../pipes/filter-table.pipe';
import {MatPaginatorModule, MatProgressSpinnerModule} from '@angular/material';
import {LayoutModule} from '../layout/layout.module';
import { CategoryFormComponent } from './category-form/category-form.component';


@NgModule({
  declarations: [CategoryListComponent, FilterTablePipe, CategoryFormComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    LayoutModule,
    ReactiveFormsModule
  ]
})
export class CategoriesModule { }
