import { Overlay } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
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
}
