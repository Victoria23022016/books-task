import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  isAuth: boolean;

  constructor(private readonly _authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    this._authService.isAuthenticated().subscribe((resp) => {
      this.isAuth = resp;
    });
    if (this.isAuth) {
      return true;
    } else {
      return false;
    }
  }
}
