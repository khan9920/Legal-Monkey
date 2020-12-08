import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { VerifyAccountComponent } from '../components/auth/verify-account/verify-account.component';

const apiUrl = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoading = new Subject<boolean>();

  constructor(private http: HttpClient, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  public setLoadingStatus(status: boolean) {
    this.isLoading.next(status);
  }

  public getLoadingStatus() {
    return this.isLoading.asObservable();
  }

  public signUp(data: any): void {
    this.http.post<{ success: boolean, data: any }>(`${apiUrl}/users`, data).subscribe(result => {
      if (result.success) {
        this.saveAuthData(result.data.token);
        this.isLoading.next(false);
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
      })
    });
  }

  public login(data: any): void {
    this.http.post<{ success: boolean, data: any }>(`${apiUrl}/users/login`, data).subscribe(result => {
      if (result.success) {
        this.saveAuthData(result.data.token);
        this.isLoading.next(false);
        this.dialog.closeAll();
      }
    }, error => {
      this.isLoading.next(false);
      this.snackBar.open(error.error.data, 'Dismiss', {
        duration: 3000
      })
    });
  }

  private saveAuthData(token: string): void {
    localStorage.setItem('token', token);
  }
}