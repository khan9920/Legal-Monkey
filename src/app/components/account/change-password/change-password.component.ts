import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { MeService } from 'src/app/services/me.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  public isLoading: boolean = false;
  private isLoadingSub: Subscription;

  public passwords = {
    password: '',
    newPassword: '',
    confirmPassword: ''
  }

  public validation = {
    password: true,
    newPassword: true,
    confirmPassword: true
  }

  constructor(private meService: MeService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.isLoadingSub = this.meService.getLoadingStatus().subscribe(result => {
      this.isLoading = result;
    });
  }

  onChangePassword() {
    this.meService.setLoadingStatus(true);
    this.validator();
    if (!this.validation.password || !this.validation.newPassword || !this.validation.confirmPassword) {
      this.meService.setLoadingStatus(false);
      return;
    }

    const data = {
      password: this.passwords.password,
      newPassword: this.passwords.newPassword
    }

    this.meService.changePassword(data);
  }

  onClose() {
    this.dialog.closeAll();
  }

  private validator() {
    if (this.passwords.password == '') {
      this.validation.password = false;
    } else {
      this.validation.password = true;
    }

    if (this.passwords.newPassword == '') {
      this.validation.newPassword = false;
    } else {
      this.validation.newPassword = true;
    }

    if (this.passwords.confirmPassword == '') {
      this.validation.confirmPassword = false;
    } else {
      this.validation.confirmPassword = true;
    }

    if (this.validation.password == true && this.validation.newPassword == true && this.validation.confirmPassword == true) {
      if (this.passwords.newPassword !== this.passwords.confirmPassword) {
        this.validation.newPassword = false;
        this.validation.confirmPassword = false;
        this.snackBar.open('Passwords do not match', 'Dismiss', {
          duration: 3000
        });
      }
    }
  }

  ngOnDestroy() {
    this.isLoadingSub.unsubscribe();
  }
}
