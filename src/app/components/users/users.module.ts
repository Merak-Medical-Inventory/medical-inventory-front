import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { LayoutModule } from '../layout/layout.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule, MatPaginatorModule } from '@angular/material';
import { UserService } from 'src/app/services/user/user.service';
import { NgSelect2Module } from 'ng-select2';
import { RolService } from 'src/app/services/rol/rol.service';
import { UsersFormComponent } from './users-form/users-form.component';
import {DepartmentService} from '../../services/department/department.service';


@NgModule({
  declarations: [UsersListComponent, UsersFormComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    NgSelect2Module
  ],
  providers: [UserService, RolService, DepartmentService]
})
export class UsersModule { }
