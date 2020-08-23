import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Options } from "select2";
import { Select2OptionData } from "ng-select2";
import { User, PostUser } from "src/app/entities/user";
import { Rol } from "src/app/entities/rol";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/app/services/user/user.service";
import { RolService } from "src/app/services/rol/rol.service";
import Swal from "sweetalert2";
import {Department} from '../../../entities/department';
import {DepartmentService} from '../../../services/department/department.service';
import {AlertService} from '../../../services/alert/alert.service';

@Component({
  selector: "app-users-form",
  templateUrl: "./users-form.component.html",
  styleUrls: ["./users-form.component.css"],
})
export class UsersFormComponent implements OnInit {
  userForm = new FormGroup({
    username: new FormControl("", [
      Validators.required,
      Validators.maxLength(20),
    ]),
    name: new FormControl("", [Validators.required, Validators.maxLength(20)]),
    last_name: new FormControl("", [
      Validators.required,
      Validators.maxLength(20),
    ]),
    email: new FormControl("", [
      Validators.required,
      Validators.email,
      Validators.maxLength(20),
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.maxLength(20),
    ]),
    rol: new FormControl("", [Validators.required]),
    department: new FormControl("", [Validators.required])
  });
  rolOptions: Options;
  rols: Select2OptionData[] = [];
  rolsData: Rol[] = [];
  departmentOptions: Options;
  departments: Select2OptionData[] = [];
  departmentsData: Department[] = [];
  userId: number;
  submitted = false;
  buttonDisabled = false;
  isLoading = true;
  user: User;

  constructor(
    private service: UserService,
    private rolService: RolService,
    private departmentService: DepartmentService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.departmentOptions = {
      width: "100%",
      placeholder: { id: "", text: "Seleccione un Departamento..." },
    };
    this.rolOptions = {
      width: "100%",
      placeholder: { id: "", text: "Seleccione un Rol..." },
    };
    this.route.params.subscribe((params) => {
      this.userId = parseInt(params.userId, 0);
    });
    this.getSelectRols().then(() => {
      this.getSelectDepartments().then(() => {
        this.f.department.disable();
        if (this.userId) {
          this.service.getUserById(this.userId).subscribe((response) => {
            this.user = response.body["data"];
            this.f.password.disable();
            this.f.username.setValue(this.user.username);
            this.f.email.setValue(this.user.email);
            this.f.name.setValue(this.user.name);
            this.f.last_name.setValue(this.user.last_name);
            this.f.rol.setValue(String(this.user.rol.id));
            if (this.f.rol.value === '3' || this.f.rol.value === '4') {
              this.f.department.setValue(this.user.department.id);
              this.f.department.enable();
            }
          });
        }
        this.isLoading = false;
      });
    });
  }

  get f() {
    return this.userForm.controls;
  }

  async getSelectRols() {
    this.rols = await this.rolService
      .getAllRols()
      .toPromise()
      .then((value) => {
        this.rolsData = value.body["data"];
        const array: Select2OptionData[] = [];
        for (const rol of this.rolsData) {
          const data: Select2OptionData = {
            id: rol.id.toString(),
            text: rol.name,
          };
          array.push(data);
        }
        return array;
      });
  }

  async getSelectDepartments() {
    this.departments = await this.departmentService
      .getDepartments()
      .toPromise()
      .then((value) => {
        this.departmentsData = value.body["data"];
        const array: Select2OptionData[] = [];
        for (const dep of this.departmentsData) {
          const data: Select2OptionData = {
            id: dep.id.toString(),
            text: dep.name,
          };
          array.push(data);
        }
        return array;
      });
  }

  rolChanged(data: { value: string }) {
    this.f.rol.setValue(data.value);
    if (String(data) === '3' || String(data) === '4') {
      this.f.department.enable();
    } else {
      this.f.department.disable();
    }
  }

  departmentChanged(data: { value: string }) {
    this.f.department.setValue(data.value);
  }

  onSubmit() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.alertService.clear();
    this.buttonDisabled = true;
    let body: any;
    if (this.userForm.value.rol === '3' || this.userForm.value.rol === '4') {
      body = this.userId
        ? {
          username: this.userForm.value.username,
          email: this.userForm.value.email,
          name: this.userForm.value.name,
          last_name: this.userForm.value.last_name,
          rol: Number(this.userForm.value.rol),
          department: Number(this.userForm.value.department)
        }
        : {
          username: this.userForm.value.username,
          email: this.userForm.value.email,
          name: this.userForm.value.name,
          last_name: this.userForm.value.last_name,
          password: this.userForm.value.password,
          rol: Number(this.userForm.value.rol),
          department: Number(this.userForm.value.department)
        };
    } else {
      body = this.userId
        ? {
          username: this.userForm.value.username,
          email: this.userForm.value.email,
          name: this.userForm.value.name,
          last_name: this.userForm.value.last_name,
          rol: Number(this.userForm.value.rol),
        }
        : {
          username: this.userForm.value.username,
          email: this.userForm.value.email,
          name: this.userForm.value.name,
          last_name: this.userForm.value.last_name,
          password: this.userForm.value.password,
          rol: Number(this.userForm.value.rol),
        };
    }
    console.log(body);
    if (!this.userId) {
      this.service.postUser(body).subscribe(
        (response) => {
          this.router.navigate(['/users']).then((result) =>
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El usuario ha sido creado Exitosamente',
              showConfirmButton: false,
              timer: 1500,
            })
          );
        },
        (error) => {
          this.buttonDisabled = false;
          this.isLoading = false;
          this.alertService.error('Error al Crear el Usuario', false);
        }
      );
    } else {
      this.service.putUser(this.userId, body).subscribe(
        (response) => {
          this.router.navigate(['/users']).then((result) =>
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El usuario se ha Editado Exitosamente',
              showConfirmButton: false,
              timer: 1500,
            })
          );
        },
        (error) => {
          this.buttonDisabled = false;
          this.isLoading = false;
          this.alertService.error('Error al Editar el Usuario', false);
        }
      );
    }
  }
}
