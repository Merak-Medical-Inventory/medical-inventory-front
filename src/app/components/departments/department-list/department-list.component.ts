import { Component, OnInit } from '@angular/core';
import { Department } from '../../../entities/department';
import { DepartmentService} from '../../../services/department/department.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
  departments: Department[] = [];
  search = '';
  isLoading = true;

  constructor(private service: DepartmentService, private router: Router) { }

  ngOnInit() {
    this.service.getDepartments()
      .subscribe(response => {
        this.isLoading = false;
        this.departments = response.body['data'];
      }, error => {
        this.isLoading = false;
        console.log(error.error);
        Swal.fire({
          icon: 'error',
          title: 'Error al Obtener la Información de los Departamentos',
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
      title: 'Desea Eliminar el Departamento?',
      // text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.service.deleteDepartment(id)
          .subscribe(response => {
            this.reloadCurrentRoute();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El Departamento se ha Eliminado Exitosamente',
              showConfirmButton: false,
              timer: 1500
            });
          }, error => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Error al Eliminar el Departamento',
              text: 'Intente Nuevamente',
              confirmButtonColor: '#1ab394'
            });
          });
      }
    });
  }

}
