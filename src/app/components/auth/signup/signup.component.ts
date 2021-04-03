import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from '../login/login.component';

import * as EmailValidator from 'email-validator';
import { SearchCountryField, TooltipLabel, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
    mobile: null,
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
  public passwordType: string = 'password';
  public checked = false;

  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];

  changePreferredCountries() {
    this.preferredCountries = [CountryISO.SriLanka];
  }

  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.isLoadingSub = this.authService.getLoadingStatus().subscribe(result => {
      this.isLoading = result;
    });
  }

  onSignUp() {
    this.authService.setLoadingStatus(true);
    this.validator();
    if (!this.validation.firstName || !this.validation.lastName || !this.validation.email || !this.validation.mobile || !this.validation.password || !this.validation.confirmPassword) {
      this.isLoading = false;
      return;
    }

    if (!this.checked) {
      this.isLoading = false;
      this.snackBar.open('Please agree to our terms and conditions', 'Dismiss', {
        duration: 3000
      });
      return;
    }

    const user = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      mobile: this.user.mobile,
      password: this.user.password
    }
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

    if (this.user.mobile == null) {
      this.validation.mobile = false;
    } else {
      this.validation.mobile = true;
      this.user.mobile = this.user.mobile.e164Number;
    }

    if (this.user.password == '') {
      this.validation.password = false;
    } else {
      this.validation.password = true;
    }
  }

  onLogin(): void {
    this.dialog.closeAll();
    this.dialog.open(LoginComponent, {
      width: '450px',
      maxHeight: '90vh'
    });
  }

  onViewHidePassword() {
    if (this.passwordType == 'password') {
      this.passwordType = 'text';
    } else {
      this.passwordType = 'password';
    }
  }

  onClose() {
    this.dialog.closeAll();
  }

  ngOnDestroy() {
    this.isLoadingSub.unsubscribe();
  }

  onTnc() {
    this.dialog.closeAll();
    this.router.navigate(['/terms-conditions']);
  }
}