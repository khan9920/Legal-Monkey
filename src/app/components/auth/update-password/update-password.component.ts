import { Component, Inject, OnInit } from '@angular/core';
import * as EmailValidator from 'email-validator';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  public data = {
    verificationCode: '',
    password: '',
    confirmPassword: '',
  }

  public validation = {
    verificationCode: true,
    password: true,
    confirmPassword: true
  }

  public isLoading: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public email: any, private authService: AuthService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {

  }

  onResetPassword() {
    this.isLoading = true;
    this.validator();
    if (!this.validation.verificationCode || !this.validation.password || !this.validation.confirmPassword) {
      this.isLoading = false;
      return;
    }

    const data = {
      verificationCode: this.data.verificationCode,
      email: this.email.email,
      password: this.data.password
    }

    this.authService.resetPassword(data).subscribe(result => {
      if (result.success) {
        this.isLoading = false;
        this.dialog.closeAll();
        this.dialog.open(LoginComponent, {
          width: '400px',
          maxHeight: '90vh'
        });
        this.snackBar.open('Password succefully reset, please login with new credentials', 'Dismiss', {
          duration: 6000
        });
      }
    }, error => {
      this.snackBar.open(error.error.data, 'Dismiss', {
        duration: 3000
      });
    })
  }

  private validator() {
    if (this.data.verificationCode == '') {
      this.validation.verificationCode = false;
    } else {
      this.validation.verificationCode = true;
    }

    if (this.data.password == '') {
      this.validation.password = false;
    } else {
      this.validation.password = true;
    }

    if (this.data.confirmPassword == '') {
      this.validation.confirmPassword = false;
    } else {
      this.validation.confirmPassword = true;
    }

    if (this.data.password !== '' && this.data.confirmPassword !== '') {
      if (this.data.password !== this.data.confirmPassword) {
        this.validation.password = false;
        this.validation.confirmPassword = false;
        this.snackBar.open('Passwords do not match', 'Dismiss', {
          duration: 3000
        });
      }
    }
  }

  onClose() {
    this.dialog.closeAll();
  }
}
