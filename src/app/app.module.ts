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
import { EditorComponent } from './components/landingpage/editor/editor.component';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { HeaderComponent } from './components/landingpage/header/header.component';
import { HeroComponent } from './components/landingpage/hero/hero.component';
import { LoginComponent } from './components/auth/login/login.component';
import { FooterComponent } from './components/landingpage/footer/footer.component';
import { ConversionsComponent } from './components/conversions/conversions.component';
import { AccountComponent } from './components/account/account.component';
import { UpdateAccountComponent } from './components/account/update-account/update-account.component';
import { ChangePasswordComponent } from './components/account/change-password/change-password.component';
import { AddCardComponent } from './components/account/add-card/add-card.component';
import { AuthInterceptor } from './services/auth-interceptor';
import { ViewConversionComponent } from './components/conversions/view-conversion/view-conversion.component';
import { ShowPriceComponent } from './components/landingpage/show-price/show-price.component';
import { ReviewComponent } from './components/landingpage/review/review.component';
import { TncComponent } from './components/tnc/tnc.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { SimpleConversionComponent } from './components/landingpage/simple-conversion/simple-conversion.component';
import { SimpleEditorComponent } from './components/landingpage/simple-conversion/simple-editor/simple-editor.component';
import { SimpleResponseComponent } from './components/landingpage/simple-conversion/simple-response/simple-response.component';
import { DocumentConversionComponent } from './components/landingpage/document-conversion/document-conversion.component';
import { UploadDocumentComponent } from './components/landingpage/document-conversion/upload-document/upload-document.component';
import { EnterTitleComponent } from './components/landingpage/document-conversion/enter-title/enter-title.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    HeaderComponent,
    HeroComponent,
    LoginComponent,
    FooterComponent,
    ConversionsComponent,
    AccountComponent,
    UpdateAccountComponent,
    ChangePasswordComponent,
    AddCardComponent,
    EditorComponent,
    ViewConversionComponent,
    ShowPriceComponent,
    ReviewComponent,
    TncComponent,
    PrivacyPolicyComponent,
    SignupComponent,
    SimpleConversionComponent,
    SimpleEditorComponent,
    SimpleResponseComponent,
    DocumentConversionComponent,
    UploadDocumentComponent,
    EnterTitleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SwiperModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'legalhamster-dev'),
    AngularFireAuthModule,
    NgxIntlTelInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatMenuModule,
    MatCardModule,
    MatIconModule,
    MatCheckboxModule
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
