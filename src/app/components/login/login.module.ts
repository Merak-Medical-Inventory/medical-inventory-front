import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NotifierModule} from 'angular-notifier';
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
    HttpClientModule,
    NotifierModule.withConfig({
      position: {
        vertical: {
          position: 'top',
          distance: 20,
        },
        horizontal: {
          position: 'middle'
        }
      },
      behaviour: {
        onClick: 'hide',
        autoHide: 15000,
      }
    })
  ],
  providers : [UserService]
})
export class LoginModule { }
