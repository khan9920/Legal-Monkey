import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MeService } from 'src/app/services/me.service';
import { ResetPasswordComponent } from '../auth/reset-password/reset-password.component';
import { AddCardComponent } from './add-card/add-card.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UpdateAccountComponent } from './update-account/update-account.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public profileClicked: boolean = true;
  public paymentOptionsClicked: boolean = false;

  public me: any;

  constructor(private authService: AuthService, private meService: MeService, private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.meService.getMe().subscribe(result => {
      if (result.success) {
        this.me = result.data;
      }
    }, error => {
      this.snackBar.open(error.error.data, 'Dismiss', {
        duration: 3000
      });
    });
  }

  onUpdateProfile() {
    this.dialog.open(UpdateAccountComponent, {
      width: '500px',
      maxHeight: '90vh'
    });
  }

  onChangePassword() {
    this.dialog.open(ChangePasswordComponent, {
      width: '400px',
      maxHeight: '90vh'
    });
  }

  onAddCard() {
    this.dialog.open(AddCardComponent, {
      width: '400px',
      maxHeight: '90vh'
    });
  }

  onProfile() {
    this.profileClicked = true;
    this.paymentOptionsClicked = false;
  }

  onPaymentOptions() {
    this.profileClicked = false;
    this.paymentOptionsClicked = true;
  }

  onBackToHome() {
    this.router.navigate(['/']);
  }

  onLogout() {
    this.authService.logout();
  }
}
