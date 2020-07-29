import { Injectable } from '@angular/core';
import {User} from '../../entities/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuthenticated() {
    if (localStorage.getItem('isAuthenticated') === 'true') {
      return true;
    }
    return false;
  }

  getRole(): string {
    let user: User;
    user = JSON.parse(localStorage.getItem('User'));
    return user.rol.name;
  }
}
