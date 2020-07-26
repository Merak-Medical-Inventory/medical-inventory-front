import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { LayoutModule } from '../layout/layout.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule, MatPaginatorModule } from '@angular/material';
import { UserService } from 'src/app/services/user/user.service';


@NgModule({
  declarations: [UsersListComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ],
  providers: [UserService]
})
export class UsersModule { }
