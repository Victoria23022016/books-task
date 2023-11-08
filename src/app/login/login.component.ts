import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Params, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  form: FormGroup;
  formData: Params;
  correct: boolean = true;
  admission: boolean = false;

  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  submit(): void {
    this.formData = { ...this.form.value };
    if (this._authService.checkUserInLocalStorage(this.formData)) {
      this._authService.login();
      this.admission = true;
    } else {
      this.correct = false;
    }
    this.form.reset();
    this._router.navigate(['/main']);
  }
}
