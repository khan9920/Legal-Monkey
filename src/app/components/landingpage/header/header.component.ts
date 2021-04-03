import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { MeService } from 'src/app/services/me.service';

import { SignupComponent } from '../../auth/signup/signup.component';

import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public isAuthenticated: boolean = false;
  private isAuthenticatedSub: Subscription;

  public me: any = '';
  private meSub: Subscription;

  constructor(private authService: AuthService, private meService: MeService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token == '' || token == null) {
      this.isAuthenticated = false;
    } else {
      this.isAuthenticated = true;
      this.meService.setLoadingStatus(true);
      this.meService.getMe();
      this.meSub = this.meService.getMeUpdated().subscribe(result => {
        this.me = result;
      });

      this.isAuthenticatedSub = this.authService.getAuthenticationStatus().subscribe(result => {
        this.isAuthenticated = result;
      });
    }
  }

  onSignup(): void {
    this.dialog.open(SignupComponent, {
      width: '500px',
      maxHeight: '90vh'
    });
  }

  onLogout(): void {
    this.authService.logout();
  }

  onHome() {
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.isAuthenticatedSub.unsubscribe();
    this.meSub.unsubscribe();
  }
}
