import { Component } from '@angular/core';
import { GuardService } from './guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private readonly _guardService: GuardService) {}

  login(): void {
    this._guardService.login();
  }

  logout(): void {
    this._guardService.logout();
  }
}
