import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from '../login/login.component';
import * as EmailValidator from 'email-validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  public user = {
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  }

  public validation = {
    firstName: true,
    lastName: true,
    email: true,
    mobile: true,
    password: true,
    confirmPassword: true
  }

  public isLoading: boolean = false;
  public isLoadingSub: Subscription;

  constructor(private authService: AuthService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.isLoadingSub = this.authService.getLoadingStatus().subscribe(result => {
      this.isLoading = result;
    });
  }

  onSignUp() {
    this.validator();
    if (!this.validation.firstName || !this.validation.lastName || !this.validation.email || !this.validation.mobile || !this.validation.password || !this.validation.confirmPassword) {
      return;
    }

    const user = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      mobile: this.user.mobile,
      password: this.user.password
    }
    this.authService.setLoadingStatus(true);
    this.authService.signUp(user);
  }

  private validator() {
    if (this.user.firstName == '') {
      this.validation.firstName = false;
    } else {
      this.validation.firstName = true;
    }

    if (this.user.lastName == '') {
      this.validation.lastName = false;
    } else {
      this.validation.lastName = true;
    }

    if (this.user.email == '') {
      this.validation.email = false;
    } else {
      this.validation.email = true;
    }

    if (this.user.email !== '') {
      if (!EmailValidator.validate(this.user.email)) {
        this.validation.email = false;
        this.snackBar.open('Please enter a valid email', 'Dismiss', {
          duration: 3000
        });
      }
    }

    if (this.user.mobile == '') {
      this.validation.mobile = false;
    } else {
      this.validation.mobile = true;
    }

    if (this.user.password == '') {
      this.validation.password = false;
    } else {
      this.validation.password = true;
    }

    if (this.user.confirmPassword == '') {
      this.validation.confirmPassword = false;
    } else {
      this.validation.confirmPassword = true;
    }

    if (this.user.password !== '' && this.user.confirmPassword !== '') {
      if (this.user.password !== this.user.confirmPassword) {
        this.validation.password = false;
        this.validation.confirmPassword = false;
        this.snackBar.open('Passwords do not match', 'Dismiss', {
          duration: 3000
        });
      }
    }
  }

  onLogin(): void {
    this.dialog.closeAll();
    this.dialog.open(LoginComponent, {
      width: '400px',
      maxHeight: '90vh'
    });
  }

  onClose() {
    this.dialog.closeAll();
  }

  ngOnDestroy() {
    this.isLoadingSub.unsubscribe();
  }
}
