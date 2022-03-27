import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private _AuthService: AuthService , private _Router:Router) { }

  error: string = '';

  registerForm: FormGroup = new FormGroup({
    first_name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(8),
    ]),
    last_name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(8),
    ]),
    age: new FormControl(null, [
      Validators.required,
      Validators.min(18),
      Validators.max(50),
    ]),
    email: new FormControl(null,
      [Validators.required, Validators.email]),

    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/)]),
  });

  submitRegister(formInfo: FormGroup) {
    this._AuthService.register(formInfo.value).subscribe((response) => {

      if (response.message == 'success') {
        this._Router.navigate(['/login'])

      }
      else {
        this.error = 'Email already registered'
      }
    });
  }

  ngOnInit(): void { }
}
