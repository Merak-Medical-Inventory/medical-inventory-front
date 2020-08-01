import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DepartmentService} from '../../../services/department/department.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {Department, PostDepartment} from '../../../entities/department';

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
  department: Department;
  submitted = false;
  buttonDisabled = false;
  isLoading = true;
  constructor(private service: DepartmentService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.departmentId = parseInt(params.departmentId, 0);
    });
    if (this.departmentId) {
      this.service.getDepartmentById(this.departmentId).subscribe(response => {
        this.department = response.body['data'];
        console.log(response);
        this.f.code.setValue(this.department.code);
        this.f.name.setValue(this.department.name);
        this.f.description.setValue(this.department.description);
      });
    }
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
    this.isLoading = true;
    this.buttonDisabled = true;
    const body: PostDepartment = {
      code: this.departmentForm.value.code,
      name: this.departmentForm.value.name,
      description: this.departmentForm.value.description
    };
    console.log(body);
    if (!this.departmentId) {
      this.service.postDepartment(body)
        .subscribe(response => {
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
          this.isLoading = false;
          this.buttonDisabled = false;
          Swal.fire({
            icon: 'error',
            title: 'Error al Agregar el Departamento',
            text: 'Intente Nuevamente',
            confirmButtonColor: '#1ab394'
          });
        });
    } else {
      this.service.updateDepartment(body, this.departmentId)
        .subscribe(response => {
          this.router.navigate(['/departments']).then(result =>
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El Departamento se ha Editado Exitosamente',
              showConfirmButton: false,
              timer: 1500
            })
          );
        }, error => {
          this.isLoading = false;
          this.buttonDisabled = false;
          Swal.fire({
            icon: 'error',
            title: 'Error al Editar el Departamento',
            text: 'Intente Nuevamente',
            confirmButtonColor: '#1ab394'
          });
        });
    }
  }
}
