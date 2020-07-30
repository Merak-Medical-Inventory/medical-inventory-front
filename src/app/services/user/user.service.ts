import { Injectable } from '@angular/core';
import {UserLogin, PostUser} from '../../entities/user';
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
    return this.http.get(`${environment.authServiceUrl}user`,{observe : 'response'});
  }

  getUserById(id: number) {
    return this.http.get(`${environment.authServiceUrl}user/${id}`,{observe : 'response'});
  }

  postUser(user: PostUser) {
    return this.http.post(`${environment.authServiceUrl}user`,user,{observe : 'response'});
  }

  putUser(id: number,user: PostUser) {
    return this.http.put(`${environment.authServiceUrl}user/${id}`,user,{observe : 'response'});
  }

  deleteuser(id: number) {
    return this.http.delete(`${environment.authServiceUrl}user/${id}`);
  }
}
