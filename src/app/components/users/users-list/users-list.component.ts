import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entities/user';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  search = '';
  isLoading = true;

  constructor(private service: UserService, private router: Router) { }

  ngOnInit() {
    this.service.getAllUsers()
      .subscribe(response => {
        this.isLoading = false;
        console.log(response)
        this.users = response.body['data'];
      }, error => {
        this.isLoading = false;
        console.log(error.error);
        Swal.fire({
          icon: 'error',
          title: 'Error al Obtener la Información de los usuarios',
          text: 'Intente más Tarde',
          confirmButtonColor: '#1ab394'
        });
      })
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
