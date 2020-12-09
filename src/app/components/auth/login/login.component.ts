import { Overlay } from '@angular/cdk/overlay';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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

    if (!this.credentials.email || !this.validation.password) {
      return;
    }
    this.authService.setLoadingStatus(true);
    this.authService.login(this.credentials);
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

  onSignUp(): void {
    this.dialog.closeAll();
    this.dialog.open(SignupComponent, {
      width: '500px',
      maxHeight: '90vh'
    });
  }

  onResetPassword(): void {
    this.dialog.closeAll();
    this.dialog.open(ResetPasswordComponent, {
      width: '400px',
      maxHeight: '90vh'
    });
  }

  onClose(): void {
    this.dialog.closeAll();
  }

  ngOnDestroy() {
    this.isLaodingSub.unsubscribe();
  }
}
