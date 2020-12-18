import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';

import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { HeaderComponent } from './components/landingpage/header/header.component';
import { TextEditorComponent } from './components/landingpage/text-editor/text-editor.component';
import { TextProcessedComponent } from './components/landingpage/text-processed/text-processed.component';
import { HeroComponent } from './components/landingpage/hero/hero.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { VerifyAccountComponent } from './components/auth/verify-account/verify-account.component';
import { LoginComponent } from './components/auth/login/login.component';
import { FooterComponent } from './components/landingpage/footer/footer.component';
import { ConversionsComponent } from './components/conversions/conversions.component';
import { AccountComponent } from './components/account/account.component';
import { UpdateAccountComponent } from './components/account/update-account/update-account.component';
import { ChangePasswordComponent } from './components/account/change-password/change-password.component';
import { AddCardComponent } from './components/account/add-card/add-card.component';
import { FileUploaderComponent } from './components/landingpage/file-uploader/file-uploader.component';
import { AuthInterceptor } from './services/auth-interceptor';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    HeaderComponent,
    TextEditorComponent,
    TextProcessedComponent,
    HeroComponent,
    LoginComponent,
    SignupComponent,
    ResetPasswordComponent,
    VerifyAccountComponent,
    FooterComponent,
    ConversionsComponent,
    AccountComponent,
    UpdateAccountComponent,
    ChangePasswordComponent,
    AddCardComponent,
    FileUploaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SwiperModule,
    NgxIntlTelInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatMenuModule,
    MatCardModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  {
    provide: SWIPER_CONFIG,
    useValue: DEFAULT_SWIPER_CONFIG
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
