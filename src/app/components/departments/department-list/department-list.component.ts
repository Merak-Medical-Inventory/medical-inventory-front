import { Component, OnInit } from '@angular/core';
import { Department } from '../../../entities/department';
import { DepartmentService} from '../../../services/department/department.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {AlertService} from '../../../services/alert/alert.service';
import {filterTable, paginateObject} from '../../../util';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
  departments: Department[] = [];
  currentPageDepartment: Department[];
  paginatedDepartment: Department[][] = [];
  search = '';
  isLoading = true;
  pageSize = 10;

  constructor(private service: DepartmentService, private router: Router, private alertService: AlertService) { }

  ngOnInit() {
    this.service.getDepartments()
      .subscribe(response => {
        this.isLoading = false;
        this.departments = response.body['data'];
        this.paginatedDepartment = paginateObject<Department>(this.departments, this.pageSize);
        this.currentPageDepartment = this.paginatedDepartment[0];
      }, error => {
        this.isLoading = false;
        console.log(error.error);
        this.alertService.error('Error al Obtener la Información de los Departamentos', false);
      });
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  onPageChanged(event: PageEvent) {
    this.currentPageDepartment = this.paginatedDepartment[event.pageIndex];
  }

  searchTyped() {
    this.paginatedDepartment = paginateObject<Department>(filterTable<Department>(this.departments, this.search), this.pageSize);
    this.currentPageDepartment = this.paginatedDepartment[0];
  }

  onDelete(id: number) {
    this.alertService.clear();
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
        this.isLoading = false;
        this.service.deleteDepartment(id)
          .subscribe(response => {
            this.isLoading = true;
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
            this.alertService.error('Error al Eliminar el Departamento', false);
          });
      }
    });
  }

}
