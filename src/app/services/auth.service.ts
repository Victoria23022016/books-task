import { Injectable } from '@angular/core';
import { Observable, mapTo, of } from 'rxjs';
import { Params } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuth$ = of(false);

  login(): void {
    this.isAuth$ = this.isAuth$.pipe(mapTo(true));
    console.log('login'); //убрать
  }

  logout(): void {
    this.isAuth$ = this.isAuth$.pipe(mapTo(false));
    console.log('logout'); //убрать
  }

  isAuthenticated(): Observable<boolean> {
    this.isAuth$.subscribe((resp) => console.log(resp));
    return this.isAuth$;
  }

  addToLocalStorage(formData: Params): void {
    window.localStorage[formData['email']] = JSON.stringify(formData);
  }

  checkEmailInLocalStorage(email: string): boolean {
    // const check = window.localStorage.getItem(`${email}`); //возвращает в json!!!
    // if (check) {
    //   // console.log(check);
    //   return true; /*JSON.parse(check) ? true : false;*/
    // } else {
    //   return false;
    // }
    return true;
  } //для использования при регистрации

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
