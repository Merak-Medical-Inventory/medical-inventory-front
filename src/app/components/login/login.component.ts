import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted = false;
  isLoading = false;
  LoginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private router: Router) { }

  ngOnInit() {
  }

  get f() {
    return this.LoginForm.controls;
  }

  login() {
    this.submitted = true;
    localStorage.setItem('isAuthenticated', 'true');
    this.router.navigate(['/']).then();
  }

}
