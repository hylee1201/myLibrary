import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsernameValidator } from '../validators/username-validator';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  message = '';
  isSubmitted = false;
  ngUnsubscribe: Subject<any> = new Subject<any>();
  // The user management actoin to be completed
  mode: string;
  // Just a code Firebase uses to prove that
  // this is a real password reset.
  actionCode: string;

  actionCodeChecked: boolean;
  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private activatedRoute: ActivatedRoute
  ) {}

  form = new FormGroup({
    resetPassword: new FormGroup({
      password: new FormControl('',
      [
        Validators.required,
        Validators.minLength(5),
        UsernameValidator.cannotContainSpace
      ]),
      password2: new FormControl('',
      [
        Validators.required,
        Validators.minLength(5),
        UsernameValidator.cannotContainSpace
      ])
    })
  });

  ngOnInit() {
    this.activatedRoute.queryParams
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(params => {
          console.log('TCL: ResetPasswordComponent -> ngOnInit -> params', params);
          // if we didn't receive any parameters,
          // we can't do anything
          if (!params) {
            this.router.navigate(['/forgotpassword']);
          }
          this.verifyResetCode(params.oobCode);
        });
  }

  resetPassword() {
    this.isSubmitted = true;
    this.authenticationService
        .resetPassword(this.actionCode, this.password.value)
        .then(res => {
          console.log('TCL: ResetPasswordComponent -> resetPassword -> res', res);
          this.message = 'Password has been successfully reset!';
          this.router.navigate(['/login']);
        }, err => {
          console.log(err);
          this.message = err.message;
        });
  }

  private verifyResetCode(code) {
    console.log('TCL: ResetPasswordComponent -> verifyResetCode -> code', code);
    this.authenticationService
        .verifyResetCode(code)
        .then(res => {
          console.log('TCL: ResetPasswordComponent -> verifyResetCode -> res', res);
          this.actionCodeChecked = true;
          this.actionCode = code;
        }, err => {
          console.log(err);
          this.actionCodeChecked = false;
          this.router.navigate(['/login']);
        });
  }

  get password() {
    return this.form.get('resetPassword.password');
  }

  get password2() {
    return this.form.get('resetPassword.password2');
  }

  onChange() {
    this.message = '';
  }
}
