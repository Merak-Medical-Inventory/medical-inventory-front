import { Injectable } from '@angular/core';

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
}
