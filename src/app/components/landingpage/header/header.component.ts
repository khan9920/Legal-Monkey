import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from '../../auth/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public isAuthenticated: boolean = false;
  private isAuthenticatedSub: Subscription;

  constructor(private authService: AuthService, private dialog: MatDialog) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token !== '' && token !== null) {
      this.isAuthenticated = true;
    }

    this.isAuthenticatedSub = this.authService.getAuthenticationStatus().subscribe(result => {
      this.isAuthenticated = result;
    })
  }

  onLogin(): void {
    this.dialog.open(LoginComponent, {
      width: '400px',
      maxHeight: '90vh'
    });
  }

  onLogout(): void {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.isAuthenticatedSub.unsubscribe();
  }
}
