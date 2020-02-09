import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { EncryptDecryptService } from './../services/encrypt-decrypt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  message: string;
  isSubmitted = false;
  isRemembered = false;
  isLogin = false;

  constructor(private authenticationService: AuthenticationService,
              private cookieService: CookieService,
              private router: Router,
              private encDecService: EncryptDecryptService) {}

  ngOnInit() {
    const usernameInCookie = this.cookieService.get('username');
    console.log('TCL: LoginComponent -> ngOnInit -> usernameInCookie', usernameInCookie);
    if (usernameInCookie !== '' && usernameInCookie !== null) {
      this.username = usernameInCookie;
      this.isRemembered = true;
      const encryptedPassword = localStorage.getItem(usernameInCookie);
      console.log('TCL: LoginComponent -> ngOnInit -> encryptedPassword', encryptedPassword);
      if (encryptedPassword !== '' && encryptedPassword !== null) {
        this.password = this.encDecService.get(this.username, encryptedPassword);
      }
    }
    console.log('TCL: LoginComponent -> ngOnInit -> username', this.username + ', ' + this.password);
  }

  signIn() {
    this.isLogin = true;
    this.isSubmitted = true;
    this.authenticationService
        .signIn(this.username, this.password)
        .then(res => {
          console.log('TCL: LoginComponent -> signIn -> res', res);
          const encryptedPassword = this.encDecService.set(this.username, this.password);
          localStorage.setItem(this.username, encryptedPassword);

          if (this.isRemembered) {
            console.log('TCL: LoginComponent -> signIn -> username', 'Saved in localStorage: ' + this.username + ', ' + encryptedPassword);
            this.cookieService.set('username', this.username);
          }
          // tslint:disable-next-line:one-line
          else {
            this.cookieService.delete('username');
            this.isRemembered = false;
          }
          // this.message = 'Login successful';
          this.router.navigate(['/']);
          // this.username = '';
          // this.password = '';
        }, err => {
          console.log(err);
          this.message = err.message;
        });
  }

  signOut() {
    this.authenticationService.signOut(this.username);
  }

  onChange() {
    // console.log('onChange was called.');
    this.message = '';
  }
}
