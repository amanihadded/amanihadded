// auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthUserService } from '../auth-user-service.service';
import { AuthAdminService } from '../auth-admin-service.service';
import { AuthFormateurService } from '../auth-formateur-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authUserService: AuthUserService,
    private authAdminService: AuthAdminService,
    private authFormateurService: AuthFormateurService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authUserService.isAuthenticated() || this.authAdminService.isAuthenticated() || this.authFormateurService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/signin']);
      return false;
    }
  }
}
