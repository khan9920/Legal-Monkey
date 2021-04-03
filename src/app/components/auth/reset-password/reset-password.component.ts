import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from '../login/login.component';
import { UpdatePasswordComponent } from '../update-password/update-password.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public isLoading: boolean = false;
  public email = '';

  constructor(private authService: AuthService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onSendCode() {
    this.isLoading = true;
    if (this.email == '') {
      this.isLoading = false;
      this.snackBar.open('Please enter the verification code', 'Dismiss', {
        duration: 3000
      });
      return;
    } else {
      const data = {
        email: this.email
      }
      this.authService.forgotPassword(data).subscribe(result => {
        this.isLoading = false;
        if (result.success) {
          this.snackBar.open('A verification code has been sent to your email address', 'Dismiss', {
            duration: 3000
          });
        }
        this.dialog.closeAll();
        this.dialog.open(UpdatePasswordComponent, {
          width: '400px',
          maxHeight: '90vh',
          data: {
            email: this.email
          }
        });
      }, error => {
        this.isLoading = false;
        this.snackBar.open(error.error.data, 'Dismiss', {
          duration: 3000
        });
      })
    }
  }

  onLogin(): void {
    this.dialog.closeAll();
    this.dialog.open(LoginComponent, {
      width: '450px',
      maxHeight: '90vh'
    });
  }

  onClose() {
    this.dialog.closeAll();
  }
}