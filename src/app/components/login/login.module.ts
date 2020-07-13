import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {UserService} from '../../services/user/user.service';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    MatProgressSpinnerModule,
    HttpClientModule
  ],
  providers : [UserService]
})
export class LoginModule { }
