import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Params, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class RegistryComponent implements OnInit {
  form: FormGroup;
  formData: Params;

  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, this.validatorForEmail]),
      password: new FormControl('', [Validators.required]),
    });
  }

  validatorForEmail(email: FormControl): { [key: string]: boolean } | null {
    if (this._authService.checkEmailInLocalStorage(`${email.value}`)) {
      console.log('Существует'); //убрать
      return { restrictedEmail: true };
    }
    return null;
  }

  submit(): void {
    this.formData = { ...this.form.value };
    this._authService.addToLocalStorage(this.formData);
    this._router.navigate(['/']);
  }
}
