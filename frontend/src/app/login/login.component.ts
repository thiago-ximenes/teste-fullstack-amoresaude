import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth/auth.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = new BehaviorSubject(false);

  formSubmitted = false;
  hide = true;

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  constructor(
    private readonly authService: AuthService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    }, {updateOn: 'submit'})

  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.loginForm.invalid) {
      this.loginForm = new FormGroup({
        email: new FormControl(this.loginForm.value.email, [Validators.required, Validators.email]),
        password: new FormControl(this.loginForm.value.password, [Validators.required])
      }, {updateOn: 'change'});

      return;
    }

    this.loading.next(true);

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.loading.next(false);

        this.formSubmitted = false;
      },
      error: () => {
        this.loading.next(false);
        this.loginForm.get('email')?.setErrors({invalid: true});
        this.loginForm.get('password')?.setErrors({invalid: true});
      }
    });
  }

  get hasRequiredEmailError() {
    return this.loginForm.get('email')?.errors?.['required']
  }

  get hasInvalidEmailError() {
    return this.loginForm.get('email')?.errors?.['email']
  }

  get hasRequiredPasswordError() {
    return this.loginForm.get('password')?.errors?.['required']
  }

  get hasFormError() {
    return this.loginForm.invalid && this.formSubmitted && !this.hasCredentialsError;
  }

  get hasCredentialsError() {
    return this.loginForm.get('email')?.errors?.['invalid']
      || this.loginForm.get('password')?.errors?.['invalid']
  }
}
