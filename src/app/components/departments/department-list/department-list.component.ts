import { Component, OnInit } from '@angular/core';
import { Department } from '../../../entities/department';
import { DepartmentService} from '../../../services/department/department.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
  departments: Department[] = [];
  search = '';
  isLoading = true;

  constructor(private service: DepartmentService) { }

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

}
