import { Injectable } from '@angular/core';
import { Observable, mapTo, of } from 'rxjs';
import { Params } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuth$ = of(false);

  login(): void {
    this.isAuth$ = this.isAuth$.pipe(mapTo(true));
  }

  logout(): void {
    this.isAuth$ = this.isAuth$.pipe(mapTo(false));
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuth$;
  }

  addToLocalStorage(formData: Params): void {
    window.localStorage[formData['email']] = JSON.stringify(formData);
  }

  checkEmailInLocalStorage(email: string): boolean {
    return window.localStorage.getItem(`${email}`) ? true : false;
  }

  checkUserInLocalStorage(formData: Params): boolean {
    const user = window.localStorage.getItem(`${formData['email']}`);
    if (user) {
      return JSON.parse(user).password == `${formData['password']}`
        ? true
        : false;
    } else {
      return false;
    }
  }
}
