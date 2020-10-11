import { Component, OnInit } from '@angular/core';
import {User, UserTable} from 'src/app/entities/user';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {AlertService} from '../../../services/alert/alert.service';
import {filterTable, paginateObject} from '../../../util';
import {PageEvent} from '@angular/material';
import {OrderTable} from '../../../entities/order';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  usersTable: UserTable[] = [];
  currentPageUser: UserTable[];
  paginatedUser: UserTable[][] = [];
  search = '';
  isLoading = true;
  pageSize = 10;

  constructor(private service: UserService, private router: Router, private alertService: AlertService) { }

  ngOnInit() {
    this.service.getAllUsers()
      .subscribe(response => {
        this.isLoading = false;
        console.log(response);
        this.users = response.body['data'];
        this.usersTable = this.users.map(item => {
          let element: UserTable;
          if (item.department) {
            element = {
              id: item.id,
              username: item.username,
              email: item.email,
              name: item.name,
              last_name: item.last_name,
              rol: item.rol.name,
              department: item.department.name
            };
          } else {
            element = {
              id: item.id,
              username: item.username,
              email: item.email,
              name: item.name,
              last_name: item.last_name,
              rol: item.rol.name,
              department: ''
            };
          }
          return element;
        });
        this.paginatedUser = paginateObject<UserTable>(this.usersTable, this.pageSize);
        this.currentPageUser = this.paginatedUser[0];
      }, error => {
        this.isLoading = false;
        console.log(error.error);
        this.alertService.error('Error al Obtener los Usuarios', false);
      });
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  onPageChanged(event: PageEvent) {
    this.currentPageUser = this.paginatedUser[event.pageIndex];
  }

  searchTyped() {
    this.paginatedUser = paginateObject<UserTable>(filterTable<UserTable>(this.usersTable, this.search), this.pageSize);
    this.currentPageUser = this.paginatedUser[0];
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Desea Eliminar el usuario?',
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
        this.service.deleteuser(id)
          .subscribe(response => {
            this.isLoading = false;
            this.reloadCurrentRoute();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El Insumo se ha Eliminado Exitosamente',
              showConfirmButton: false,
              timer: 1500
            });
          }, error => {
            console.log(error);
            this.alertService.error('Error al Eliminar el Usuario', false);
          });
      }
    });
  }
}
