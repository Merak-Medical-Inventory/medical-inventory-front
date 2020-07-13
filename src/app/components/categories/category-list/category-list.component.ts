import { Component, OnInit } from '@angular/core';
import {Category} from '../../../entities/category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  search = '';
  isLoading = true;

  constructor() { }

  ngOnInit() {
    this.isLoading = false;
  }

}
