import { Component, OnInit } from '@angular/core';
import {Category} from '../../../entities/category';
import {CategoryService} from '../../../services/category/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  search = '';
  isLoading = true;

  constructor(private service: CategoryService) { }

  ngOnInit() {
    this.service.getCategories()
      .subscribe(response => {
        this.isLoading = false;
        this.categories = response.body['data'];
      }, error => {
        this.isLoading = false;
        console.log(error.error);
        Swal.fire({
          icon: 'error',
          title: 'Error al Obtener las Categorías',
          text: 'Intente más Tarde',
          confirmButtonColor: '#1ab394'
        });
      });
  }

}
