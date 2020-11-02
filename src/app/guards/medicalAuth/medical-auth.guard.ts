import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import { roles } from 'src/app/constants/rolConstants';

@Injectable({
  providedIn: 'root'
})
export class MedicalAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(): boolean {
    if (this.authService.getRole() !== roles.enfermero && this.authService.getRole() !== roles.medico) {
      this.router.navigate(['']).then(() => false);
    }
    return true;
  }

}
