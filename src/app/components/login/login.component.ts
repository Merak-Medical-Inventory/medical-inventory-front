import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../services/user/user.service';
import {AlertService} from '../../services/alert/alert.service';
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

  constructor(private router: Router, private loginService: UserService, private alertService: AlertService) { }

  ngOnInit() {
  }

  get f() {
    return this.LoginForm.controls;
  }

  login() {
    if (this.LoginForm.invalid) {
      return;
    }
    this.alertService.clear();
    this.submitted = true;
    this.isLoading = true;
    const body: UserLogin = {
      username : this.LoginForm.value.username,
      password : this.LoginForm.value.password
    };
    this.loginService.postLogin(body)
      .subscribe(response => {
        console.log(response);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('token', response.body['data']['token']);
        localStorage.setItem('User', JSON.stringify(response.body['data']['response']));
        this.isLoading = false;
        this.router.navigate(['/']).then();
      }, error => {
        this.isLoading = false;
        this.alertService.error('Error al Iniciar Sesión', false);
      });
  }

}
