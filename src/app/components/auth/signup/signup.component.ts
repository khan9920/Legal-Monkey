import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public credentials = {
    name: '',
    email: '',
    password: ''
  }

  public validation = {
    name: true,
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

    if (!this.validation.name ||
      !this.credentials.email ||
      !this.validation.password
    ) {
      return;
    }
    this.authService.setLoadingStatus(true);
    this.authService.EmailPasswordSignUp(this.credentials);
  }

  private validator() {
    if (this.credentials.name == '') {
      this.validation.name = false;
    } else {
      this.validation.name = true;
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
