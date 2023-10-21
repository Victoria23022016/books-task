import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { BookService } from './book.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(_bookService: BookService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return false;
  }
}
