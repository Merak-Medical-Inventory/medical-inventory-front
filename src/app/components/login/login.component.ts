import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../services/user/user.service';
import {NotifierService} from 'angular-notifier';
import {UserLogin} from '../../entities/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted = false;
  isLoading = false;
  LoginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private router: Router, private loginService: UserService, private notifierService: NotifierService) { }

  ngOnInit() {
  }

  get f() {
    return this.LoginForm.controls;
  }

  login() {
    this.submitted = true;
    this.isLoading = true;
    const body: UserLogin = {
      username : this.LoginForm.value.username,
      password : this.LoginForm.value.password
    }
    this.loginService.postLogin(body)
      .subscribe(response => {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('token', response.body['data']['token']);
        localStorage.setItem('User', JSON.stringify(response.body['data']['response']));
        this.isLoading = false;
        this.router.navigate(['/']).then();
      }, error => {
        this.isLoading = false;
        this.notifierService.show({
          type: 'error',
          message: 'Error al Iniciar Sesión'
        });
        return;
      });
  }

}
