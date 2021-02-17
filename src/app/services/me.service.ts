import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { environment } from './../../environments/environment';

const apiUrl = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class MeService {

  private isLoading = new Subject<boolean>();
  private meSub = new Subject();
  private cards = new Subject<[]>();

  constructor(private http: HttpClient, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  public setLoadingStatus(status: boolean) {
    this.isLoading.next(status);
  }

  public getLoadingStatus() {
    return this.isLoading.asObservable();
  }

  // Me 
  getMeUpdated() {
    return this.meSub.asObservable();
  }

  getMe() {
    this.isLoading.next(true);
    this.http.get<{ success: boolean, data: any }>(`${apiUrl}/users`).subscribe(result => {
      if (result.success) {
        this.meSub.next(result.data);
        this.isLoading.next(false);
      }
    }, error => {
      this.snackBar.open(error.error.data, 'Dismiss', {
        duration: 3000
      });
    });
  }

  updateMe(data: any) {
    this.http.put<{ success: boolean, data: any }>(`${apiUrl}/users`, data).subscribe(result => {
      if (result.success) {
        this.meSub.next(result.data);
        this.isLoading.next(false);
        this.dialog.closeAll();
        this.snackBar.open('Profile updated successfully', 'Dismiss', {
          duration: 3000
        });
      }
    }, error => {
      this.setLoadingStatus(false);
      this.snackBar.open(error.error.data, 'Dismiss', {
        duration: 3000
      });
    });
  }

  changePassword(data: any) {
    this.http.patch<{ success: boolean, data: any }>(`${apiUrl}/users/passwords`, data).subscribe(result => {
      if (result.success) {
        this.setLoadingStatus(false);
        this.dialog.closeAll();
        this.snackBar.open('Password changes successfully', 'Dismiss', {
          duration: 3000
        })
      }
    }, error => {
      this.setLoadingStatus(false);
      this.snackBar.open(error.error.data, 'Dismiss', {
        duration: 3000
      });
    });
  }

  // Payment options
  addCard(data: any) {
    this.http.post<{ success: boolean, data: any }>(`${apiUrl}/users/cards`, data).subscribe(result => {
      if (result.success) {
        this.setLoadingStatus(false);
        this.dialog.closeAll();
        this.cards.next(result.data);
        this.snackBar.open('Card successfully added', 'Dismiss', {
          duration: 3000
        })
      }
    }, error => {
      this.setLoadingStatus(false);
      this.snackBar.open(error.error.data, 'Dismiss', {
        duration: 3000
      });
    });
  }

  getCardsUpdated() {
    return this.cards.asObservable();
  }

  getCards() {
    this.http.get<{ success: boolean, data: any }>(`${apiUrl}/users/cards`).subscribe(result => {
      if (result.success) {
        this.setLoadingStatus(false);
        this.cards.next(result.data);
      }
    }, error => {
      this.setLoadingStatus(false);
      this.snackBar.open(error.error.data, 'Dismiss', {
        duration: 3000
      });
    });
  }

  updateCard(data: any) {
    this.http.put<{ success: boolean, data: any }>(`${apiUrl}/users/cards`, data).subscribe(result => {
      if (result.success) {
        this.setLoadingStatus(false);
        this.cards.next(result.data);
        this.snackBar.open('Default card changed successfully', 'Dismiss', {
          duration: 3000
        })
      }
    }, error => {
      this.setLoadingStatus(false);
      this.snackBar.open(error.error.data, 'Dismiss', {
        duration: 3000
      });
    });
  }

  removeCard(data: any) {
    this.http.request<{ success: boolean, data: any }>('delete', `${apiUrl}/users/cards/`, { body: data }).subscribe(result => {
      if (result.success) {
        this.setLoadingStatus(false);
        this.cards.next(result.data);
        this.snackBar.open('Card removed successfully', 'Dismiss', {
          duration: 3000
        })
      }
    }, error => {
      this.setLoadingStatus(false);
      this.snackBar.open(error.error.data, 'Dismiss', {
        duration: 3000
      });
    });
  }
}
