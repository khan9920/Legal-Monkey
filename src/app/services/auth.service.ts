import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

const apiUrl = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  public signUp(data: any): void {
    delete data.confirmPassword;
    this.http.post<{ success: boolean, data: any }>(`${apiUrl}/users`, data).subscribe(result => {
      if (result.success) {
        this.saveAuthData(result.data.token);
        this.dialog.closeAll();
      }
    }, error => {
      this.snackBar.open(error.error.data, 'Dismiss', {
        duration: 3000
      })
    });
  }

  private saveAuthData(token: string): void {
    localStorage.setItem('token', token);
  }
}
