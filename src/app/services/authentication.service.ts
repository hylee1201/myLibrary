import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userData: Observable<firebase.User>;
  idToken;

  constructor(private angularFireAuth: AngularFireAuth,
              private jwtHelperService: JwtHelperService) {
    this.userData = angularFireAuth.authState;
  }

  signUp(email: string, password: string) {
    // tslint:disable-next-line:no-shadowed-variable
    return this.angularFireAuth
               .auth
               .createUserWithEmailAndPassword(email, password)
               .then(res => {
                  // console.log('TCL: AuthenticationService -> signUp -> res', JSON.stringify(res));
                },
                error => {
                  // console.log('TCL: AuthenticationService -> signUp -> error', JSON.stringify(error));
                });
  }

  /* Sign in */
  signIn(email: string, password: string) {
    // console.log(email + ', ' + password);
    // tslint:disable-next-line:no-shadowed-variable
    return this.angularFireAuth
               .auth
               .signInWithEmailAndPassword(email, password)
               .then(res => {
                  // console.log('TCL: AuthenticationService -> signIn -> res', JSON.stringify(res));
                },
                error => {
                  // console.log('TCL: AuthenticationService -> signIn -> error', JSON.stringify(error));
                });
  }

  sendEmailforResettingPassword(email: string) {
    // tslint:disable-next-line:no-shadowed-variable
    return this.angularFireAuth
               .auth
               .sendPasswordResetEmail(email, { url: 'http://localhost:4200/resetpassword' })
               .then(res => {
                  // console.log('TCL: AuthenticationService -> sendEmailforResettingPassword -> res', JSON.stringify(res));
              },
              error => {
                  // console.log('TCL: AuthenticationService -> sendEmailforResettingPassword -> error', JSON.stringify(error));
              });
  }

  // Firebase Google Sign-in
  // signinWithGoogle() {
  //   return this.OAuthProvider(new auth.GoogleAuthProvider())
  //              .then(res => {
  //                 console.log('Successfully logged in!')
  //           }).catch(error => {
  //               console.log(error);
  //           });
  //   }

  resetPassword(code: string, newPassword: string) {
    return this.angularFireAuth
               .auth
               .confirmPasswordReset(code, newPassword)
               .then(res => {
                  console.log('TCL: AuthenticationService -> resetPassword -> res', JSON.stringify(res));
               },
               error => {
                  console.log('TCL: AuthenticationService -> resetPassword -> error', JSON.stringify(error));
               });
  }

  verifyResetCode(code: string) {
    return this.angularFireAuth
               .auth
               .verifyPasswordResetCode(code)
               .then(res => {
                  console.log('TCL: AuthenticationService -> verifyResetCode -> res', JSON.stringify(res));
               },
               error => {
                  console.log('TCL: verifyResetCode -> error', JSON.stringify(error));
               });
  }

  /* Sign out */
  signOut(username) {
    this.angularFireAuth
        .auth
        .signOut()
        .catch(this.handleError);

    localStorage.removeItem(username);
  }

  // private getIdTokenFromFireBase() {
  //   this.angularFireAuth
  //       .auth.currentUser
  //       .getIdToken()
  //       .then(idToken => {
  //         this.idToken = idToken;
  //         console.log('TCL: AuthenticationService -> getFireBaseToken -> idToken', idToken);
  //       },
  //       error => {
  //         console.log('TCL: AuthenticationService -> getFireBaseToken -> error', error);
  //       });
  // }

  isLoggedIn() {
    return this.angularFireAuth.auth.onAuthStateChanged(user => {
      if (user) {
          this.angularFireAuth
              .auth.currentUser
              .getIdToken()
              .then(IdToken => {
                // console.log('TCL: AuthenticationService -> isLoggedIn -> IdToken', IdToken);
                const expirationDate = this.jwtHelperService.getTokenExpirationDate(IdToken);
                // tslint:disable-next-line:prefer-const
                let isExpired = this.jwtHelperService.isTokenExpired(IdToken);

                // console.log('ExpirationDate: ' + expirationDate);
                // console.log('IsExpired: ' + isExpired);
                return !isExpired;
              });
      } else {
          // console.log('onAuthStateChanged else');
          return false;
      }
    });
  }

  private handleError(error) {
    console.log(error.code);
    return throwError(error);
  }
}
