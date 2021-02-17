import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { VerifyAccountComponent } from '../components/auth/verify-account/verify-account.component';
import { Router } from '@angular/router';

const apiUrl = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  private isLoading = new Subject<boolean>();
  private isAuthenticated = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  public setLoadingStatus(status: boolean) {
    this.isLoading.next(status);
  }

  public getLoadingStatus() {
    return this.isLoading.asObservable();
  }

  public setAuthenticationStatus(status: boolean) {
    this.isAuthenticated.next(status);
  }

  public getAuthenticationStatus() {
    return this.isAuthenticated.asObservable();
  }

  public getToken() {
    return this.token;
  }

  public signUp(data: any): void {
    this.http.post<{ success: boolean, data: any }>(`${apiUrl}/users`, data).subscribe(result => {
      if (result.success) {
        this.saveAuthData(result.data.token);
        this.token = result.data.token;
        this.isLoading.next(false);
        this.isAuthenticated.next(true);
        this.dialog.closeAll();
        this.dialog.open(VerifyAccountComponent, {
          width: '400px',
          maxHeight: '90vh',
          disableClose: true
        })
      }
    }, error => {
      this.isLoading.next(false);
      this.snackBar.open(error.error.data, 'Dismiss', {
        duration: 3000
      });
    });
  }

  public login(data: any): void {
    this.http.post<{ success: boolean, data: any }>(`${apiUrl}/users/login`, data).subscribe(result => {
      if (result.success) {
        this.saveAuthData(result.data.token);
        this.token = result.data.token;
        this.isAuthenticated.next(true);
        this.isLoading.next(false);
        this.dialog.closeAll();
      }
    }, error => {
      this.isLoading.next(false);
      this.snackBar.open(error.error.data, 'Dismiss', {
        duration: 3000
      });
    });
  }

  public verifyAccount(data: any) {
    return this.http.put<{ success: boolean, data: any }>(`${apiUrl}/users/verify`, data);
  }

  public resendVerificationCode() {
    return this.http.post<{ success: boolean, data: any }>(`${apiUrl}/users/verify`, {});
  }

  public forgotPassword(data: any) {
    return this.http.post<{ success: boolean, data: any }>(`${apiUrl}/users/passwords`, data);
  }

  public resetPassword(data: any) {
    return this.http.put<{ success: boolean, data: any }>(`${apiUrl}/users/passwords`, data);
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.token = null;
    this.isAuthenticated.next(false);
    this.router.navigate(['/']);
    this.snackBar.open('See you soon!', 'Dismiss', {
      duration: 3000
    })
  }

  public autoAuth() {
    const token = localStorage.getItem('token');

    if (token !== '') {
      this.token = token;
      this.isAuthenticated.next(true);
      this.setAuthenticationStatus(true);
    }
  }

  private saveAuthData(token: string): void {
    localStorage.setItem('token', token);
  }
}
