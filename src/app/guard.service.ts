import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GuardService {
  private isAuth = false;

  login(): void {
    this.isAuth = true;
  }

  logout(): void {
    this.isAuth = false;
  }

  isAuthenticated(): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.isAuth);
      }, 0);
    });
  }
}
