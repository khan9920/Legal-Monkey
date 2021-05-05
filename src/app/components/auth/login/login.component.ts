import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';

import { MatDialog } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public credentials = {
    email: '',
    password: ''
  }

  public validation = {
    email: true,
    password: true
  }

  public isLoading: boolean = false;
  public isLaodingSub: Subscription;

  constructor(private authService: AuthService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.isLaodingSub = this.authService.getLoadingStatus().subscribe(result => {
      this.isLoading = result;
    });
  }

  onLogin() {
    this.validator();

    if (!this.credentials.email ||
      !this.validation.password
    ) {
      return;
    }
    this.authService.setLoadingStatus(true);
    this.authService.EmailPasswordSignIn(this.credentials);
  }

  private validator() {
    if (this.credentials.email == '') {
      this.validation.email = false;
    } else {
      this.validation.email = true;
    }

    if (this.credentials.password == '') {
      this.validation.password = false
    } else {
      this.validation.password = true;
    }
  }

  onClose(): void {
    this.dialog.closeAll();
  }

  ngOnDestroy() {
    this.isLaodingSub.unsubscribe();
  }

  onGoogle() {
    this.authService.GoogleAuth();
  }

  onFacebook() {
    this.authService.FacebookAuth();
  }

  onApple() {
    this.authService.AppleAuth();
  }

  onOutlook() {
    this.authService.OutlookAuth();
  }

  onSignUp() {
    this.dialog.closeAll();
    this.dialog.open(SignupComponent, {
      width: '450px',
      maxHeight: '90vh'
    });
  }
}
