import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public credentials = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }

  public validation = {
    firstName: true,
    lastName: true,
    email: true,
    password: true
  }

  public isLoading: boolean = false;
  public isLaodingSub: Subscription;

  constructor(private authService: AuthService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.isLaodingSub = this.authService.getLoadingStatus().subscribe(result => {
      this.isLoading = result;
    });
  }

  onLogin() {
    this.validator();

    if (!this.validation.firstName ||
      !this.validation.lastName ||
      !this.credentials.email ||
      !this.validation.password
    ) {
      return;
    }
    const data = {
      name: `${this.credentials.firstName} ${this.credentials.lastName}`,
      email: this.credentials.email,
      password: this.credentials.password
    }

    this.authService.setLoadingStatus(true);
    this.authService.EmailPasswordSignUp(data);
  }

  private validator() {
    if (this.credentials.firstName == '') {
      this.validation.firstName = false;
    } else {
      this.validation.firstName = true;
    }

    if (this.credentials.lastName == '') {
      this.validation.lastName = false;
    } else {
      this.validation.lastName = true;
    }

    if (this.credentials.email == '') {
      this.validation.email = false;
    } else {
      this.validation.email = true;
    }

    if (this.credentials.password == '') {
      this.validation.password = false
    } else {
      this.validation.password = true;
    }
  }

  onClose(): void {
    this.dialog.closeAll();
  }

  ngOnDestroy() {
    this.isLaodingSub.unsubscribe();
  }

  onGoogle() {
    this.authService.GoogleAuth();
  }

  onFacebook() {
    this.authService.FacebookAuth();
  }

  onApple() {
    this.authService.AppleAuth();
  }

  onOutlook() {
    this.authService.OutlookAuth();
  }
}
