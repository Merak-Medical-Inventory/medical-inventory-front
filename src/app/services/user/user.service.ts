import { Injectable } from '@angular/core';
import {UserLogin} from '../../entities/user';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  postLogin(body: UserLogin) {
    return this.http.post(`${environment.authServiceUrl}auth/login`, body, {observe: 'response'});
  }

  getAllUsers() {
    return this.http.get(`${environment.authServiceUrl}/user`,{observe : 'response'});
  }
}
