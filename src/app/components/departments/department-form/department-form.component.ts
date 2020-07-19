import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DepartmentService} from '../../../services/department/department.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {PostDepartment} from '../../../entities/department';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css']
})
export class DepartmentFormComponent implements OnInit {
  departmentForm = new FormGroup({
    code: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    name : new FormControl('', [Validators.required, Validators.maxLength(20)]),
    description : new FormControl('', [Validators.required, Validators.maxLength(40)])
  });
  edit = false;
  departmentId: number;
  submitted = false;
  buttonDisabled = false;
  isLoading = true;
  constructor(private departmentService: DepartmentService, private router: Router) { }

  ngOnInit() {
    this.isLoading = false;
  }

  get f() {
    return this.departmentForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.departmentForm.invalid) {
      return;
    }
    this.buttonDisabled = true;
    const body: PostDepartment = {
      code: this.departmentForm.value.code,
      name: this.departmentForm.value.name,
      description: this.departmentForm.value.description
    };
    console.log(body);
    this.departmentService.postDepartment(body)
      .subscribe( response => {
        this.router.navigate(['/departments']).then(result =>
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El Departamento se ha Agregado Exitosamente',
            showConfirmButton: false,
            timer: 1500
          })
        );
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Error al Agregar el Departamento',
          text: 'Intente Nuevamente',
          confirmButtonColor: '#1ab394'
        });
      });
  }
}
