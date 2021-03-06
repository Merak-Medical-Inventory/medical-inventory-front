import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import { roles } from 'src/app/constants/rolConstants';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(): boolean {
    if (this.authService.getRole() !== roles.superUser && this.authService.getRole() !== roles.admin) {
      this.router.navigate(['']).then(() => false);
    }
    return true;
  }

}
