import { Component, OnInit } from '@angular/core';
import {Category} from '../../../entities/category';
import {CategoryService} from '../../../services/category/category.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {AlertService} from '../../../services/alert/alert.service';
import {filterTable, paginateObject} from '../../../util';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  currentPageCategory: Category[];
  paginatedCategory: Category[][] = [];
  search = '';
  isLoading = true;
  pageSize = 10;

  constructor(private service: CategoryService, private router: Router, private alertService: AlertService) { }

  ngOnInit() {
    this.service.getCategories()
      .subscribe(response => {
        this.isLoading = false;
        this.categories = response.body['data'];
        this.paginatedCategory = paginateObject<Category>(this.categories, this.pageSize);
        this.currentPageCategory = this.paginatedCategory[0];
      }, error => {
        this.isLoading = false;
        console.log(error.error);
        this.alertService.error('Error al Obtener las Categorías', false);
      });
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  onPageChanged(event: PageEvent) {
    this.currentPageCategory = this.paginatedCategory[event.pageIndex];
  }

  searchTyped() {
    this.paginatedCategory = paginateObject<Category>(filterTable<Category>(this.categories, this.search), this.pageSize);
    this.currentPageCategory = this.paginatedCategory[0];
  }

  onDelete(id: number) {
    this.alertService.clear();
    Swal.fire({
      title: 'Desea Eliminar la Categoría?',
      // text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.isLoading = true;
        this.service.deleteCategory(id)
          .subscribe(response => {
            this.isLoading = false;
            this.reloadCurrentRoute();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'La Categoría se ha Eliminado Exitosamente',
              showConfirmButton: false,
              timer: 1500
            });
          }, error => {
            console.log(error);
            this.alertService.error('Error al Eliminar la Categorías', false);
          });
      }
    });
  }

}
