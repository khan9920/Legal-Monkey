import { Component, Inject, OnChanges, OnInit } from '@angular/core';
import { LoginComponent } from '../../auth/login/login.component';
import { SearchCountryField, TooltipLabel, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as EmailValidator from 'email-validator';
import { MeService } from 'src/app/services/me.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css']
})
export class UpdateAccountComponent implements OnInit {

  public isLoading: boolean = false;
  private isLoadingSub: Subscription;

  public user = {
    firstName: this.data.firstName,
    lastName: this.data.lastName,
    email: this.data.email,
    mobile: this.data.mobile
  }

  public validation = {
    firstName: true,
    lastName: true,
    email: true,
    mobile: true,
  }

  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];

  changePreferredCountries() {
    this.preferredCountries = [CountryISO.SriLanka];
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private meService: MeService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.isLoadingSub = this.meService.getLoadingStatus().subscribe(result => {
      this.isLoading = result;
    });
  }

  onUpdate() {
    this.meService.setLoadingStatus(true);
    this.validator();
    if (!this.validation.firstName || !this.validation.lastName || !this.validation.email || !this.validation.mobile) {
      return;
    }

    this.meService.updateMe(this.user);
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
}
