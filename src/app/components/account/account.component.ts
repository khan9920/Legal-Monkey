import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ResetPasswordComponent } from '../auth/reset-password/reset-password.component';
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

  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
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
