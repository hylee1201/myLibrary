import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { environment } from './../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from './services/data.service';
import { LoginService } from './services/login.service';
import { AppErrorHandler } from './errors/app-error-handler';
import { SignupComponent } from './signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

import { CookieService } from 'ngx-cookie-service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HomeComponent } from './home/home.component';
import { EncryptDecryptService } from './services/encrypt-decrypt.service';
import { AuthGuard } from './services/auth-guard.service';
import { JwtHelperService, JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { MatComponentsModule } from './modules/mat-components/mat-components.module';
import { BookListComponent } from './book-list/book-list.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NotFoundComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    HomeComponent,
    BookListComponent,
    HeaderComponent,
    FooterComponent
  ],
  entryComponents: [
    LoginComponent
  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatComponentsModule,
    FlexLayoutModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
             return localStorage.getItem('token');
        }
      }
    })
  ],
  providers: [
    AngularFireAuth,
    DataService,
    LoginService,
    { provide: ErrorHandler, useClass: AppErrorHandler},
    CookieService,
    EncryptDecryptService,
    AuthGuard,
    JwtHelperService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
