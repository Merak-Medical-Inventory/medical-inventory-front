import { Component, OnInit } from '@angular/core';
import {Brand} from '../../../entities/brand';
import {BrandService} from '../../../services/brand/brand.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {
  brands: Brand[] = [];
  search = '';
  isLoading = true;

  constructor(private service: BrandService, private router: Router) { }

  ngOnInit() {
    this.service.getBrands()
      .subscribe(response => {
        this.isLoading = false;
        this.brands = response.body['data'];
      }, error => {
        this.isLoading = false;
        console.log(error.error);
        Swal.fire({
          icon: 'error',
          title: 'Error al Obtener las Marcas',
          text: 'Intente más Tarde',
          confirmButtonColor: '#1ab394'
        });
      });
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  onDelete(id: number) {
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
        this.service.deleteBrand(id)
          .subscribe(response => {
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
            Swal.fire({
              icon: 'error',
              title: 'Error al Eliminar la Marca',
              text: 'Intente Nuevamente',
              confirmButtonColor: '#1ab394'
            });
          });
      }
    });
  }

}
