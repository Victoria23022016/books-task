import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) {}

  logout(): void {
    this._authService.logout();
    this._router.navigate(['/']);
  }
}
