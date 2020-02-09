import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsernameValidator } from '../validators/username-validator';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  message = '';
  isSubmitted = false;

  constructor(private authenticationService: AuthenticationService) {}

  form = new FormGroup({
    signup: new FormGroup({
      username: new FormControl('',
      [
        Validators.required,
        Validators.minLength(3),
        UsernameValidator.cannotContainSpace,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
      ]),
      password: new FormControl('',
      [
        Validators.required,
        Validators.minLength(5),
      ]),
      password2: new FormControl('',
      [
        Validators.required,
        Validators.minLength(5)
      ])
    })
  });

  signUp() {
    this.isSubmitted = true;
    this.authenticationService
        .signUp(this.username.value, this.password.value)
        .then(res => {
          console.log(res);
          this.message = 'SignUp successful';
        }, err => {
          console.log(err);
          this.message = err.message;
        });
  }

  get username() {
    return this.form.get('signup.username');
  }

  get password() {
    return this.form.get('signup.password');
  }

  get password2() {
    return this.form.get('signup.password2');
  }

  onChange() {
    this.message = '';
  }

}
