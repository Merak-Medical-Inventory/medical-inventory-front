import { Component, OnInit } from '@angular/core';
import {Brand} from '../../../entities/brand';
import {BrandService} from '../../../services/brand/brand.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {AlertService} from '../../../services/alert/alert.service';
import {filterTable, paginateObject} from '../../../util';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {
  brands: Brand[] = [];
  currentPageBrand: Brand[];
  paginatedBrand: Brand[][] = [];
  search = '';
  isLoading = true;
  pageSize = 10;

  constructor(private service: BrandService, private router: Router, private alertService: AlertService) { }

  ngOnInit() {
    this.service.getBrands()
      .subscribe(response => {
        this.isLoading = false;
        this.brands = response.body['data'];
        this.paginatedBrand = paginateObject<Brand>(this.brands, this.pageSize);
        this.currentPageBrand = this.paginatedBrand[0];
      }, error => {
        this.isLoading = false;
        console.log(error.error);
        this.alertService.error('Error al Obtener las Marcas', false);
      });
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  onPageChanged(event: PageEvent) {
    this.currentPageBrand = this.paginatedBrand[event.pageIndex];
  }

  searchTyped() {
    this.paginatedBrand = paginateObject<Brand>(filterTable<Brand>(this.brands, this.search), this.pageSize);
    this.currentPageBrand = this.paginatedBrand[0];
  }

  onDelete(id: number) {
    this.alertService.clear();
    Swal.fire({
      title: 'Desea Eliminar la Marca?',
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
        this.service.deleteBrand(id)
          .subscribe(response => {
            this.isLoading = false;
            this.reloadCurrentRoute();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'La Marca se ha Eliminado Exitosamente',
              showConfirmButton: false,
              timer: 1500
            });
          }, error => {
            console.log(error);
            this.alertService.error('Error al Eliminar la Marca', false);
          });
      }
    });
  }

}
