import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { AddCardComponent } from '../../account/add-card/add-card.component';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent implements OnInit {
  public isLoading: boolean = false;
  public verificationCode = '';

  constructor(private authService: AuthService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onVerify() {
    this.isLoading = true;
    if (this.verificationCode == '') {
      this.isLoading = false;
      this.snackBar.open('Please enter the verification code', 'Dismiss', {
        duration: 3000
      });
      return;
    } else {
      const data = {
        verificationCode: this.verificationCode
      }
      this.authService.verifyAccount(data).subscribe(result => {
        this.isLoading = false;
        if (result.success) {
          this.dialog.open(AddCardComponent, {
            width: '400px',
            maxHeight: '90vh'
          });
          this.snackBar.open('Account successfully verified', 'Dismiss', {
            duration: 3000
          });
        }
        this.dialog.closeAll();
      }, error => {
        this.isLoading = false;
        this.snackBar.open(error.error.data, 'Dismiss', {
          duration: 3000
        });
      })
    }
  }

  onResendVerificationCode() {
    this.isLoading = true;

    this.authService.resendVerificationCode().subscribe(result => {
      this.isLoading = false;
      if (result.success) {
        this.snackBar.open('Verification code has been resent to your email', 'Dismiss', {
          duration: 3000
        });
      }
    }, error => {
      this.isLoading = false;
      this.snackBar.open(error.error.data, 'Dismiss', {
        duration: 3000
      });
    })
  }

  onClose() {
    this.dialog.closeAll();
    this.dialog.open(AddCardComponent, {
      width: '400px',
      maxHeight: '90vh'
    });
  }
}
