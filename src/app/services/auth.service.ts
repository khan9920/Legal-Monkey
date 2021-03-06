import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

const apiUrl = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  private isLoading = new Subject<boolean>();
  private isAuthenticated: boolean = false;
  private isAuthenticatedUpdated = new Subject<boolean>();
  private authMe: any;
  private authMeSub = new Subject<any>();

  constructor(public afAuth: AngularFireAuth, private http: HttpClient, private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  FacebookAuth() {
    return this.AuthLogin(new firebase.auth.FacebookAuthProvider());
  }

  AppleAuth() {
    return this.AuthLogin(new firebase.auth.OAuthProvider('apple.com'));
  }

  OutlookAuth() {
    return this.AuthLogin(new firebase.auth.OAuthProvider('microsoft.com'));
  }

  EmailPasswordSignUp(data: any) {
    return this.afAuth.createUserWithEmailAndPassword(data.email, data.password)
      .then(result => {
        const user = {
          uid: result.user.uid,
          name: data.name,
          email: result.user.email
        }

        this.http.post<{ success: boolean, data: any }>(`${apiUrl}/users`, user).subscribe(result => {
          if (result.success) {
            const user = {
              firstName: result.data.firstName,
              lastName: result.data.lastName,
              email: result.data.email,
              userType: result.data.userType,
              createdDate: result.data.createdDate,
              cards: result.data.cards
            }

            this.authMe = user;
            this.authMeSub.next(this.authMe);
            this.saveAuthData(result.data.token, user);
            this.token = result.data.token;
            this.isLoading.next(false);
            this.isAuthenticatedUpdated.next(true);
            this.dialog.closeAll();

            this.snackBar.open('Welcome to Legal Hamster!', 'Dismiss', {
              duration: 3000
            })
          }
        }, error => {
          this.isLoading.next(false);
          this.snackBar.open(error.error.data, 'Dismiss', {
            duration: 3000
          });
        });
      })
      .catch((error) => {
        this.isLoading.next(false);
        this.snackBar.open(error.message, 'Dismiss', {
          duration: 3000
        });
      });
  }

  EmailPasswordSignIn(data: any) {
    return this.afAuth.signInWithEmailAndPassword(data.email, data.password)
      .then(result => {
        const user = {
          uid: result.user.uid,
          email: result.user.email
        }

        this.http.post<{ success: boolean, data: any }>(`${apiUrl}/users`, user).subscribe(result => {
          if (result.success) {
            const user = {
              firstName: result.data.firstName,
              lastName: result.data.lastName,
              email: result.data.email,
              userType: result.data.userType,
              createdDate: result.data.createdDate,
              cards: result.data.cards
            }

            this.authMe = user;
            this.authMeSub.next(this.authMe);
            this.saveAuthData(result.data.token, user);
            this.token = result.data.token;
            this.isLoading.next(false);
            this.isAuthenticatedUpdated.next(true);
            this.dialog.closeAll();

            this.snackBar.open('Welcome to Legal Hamster!', 'Dismiss', {
              duration: 3000
            })
          }
        }, error => {
          this.isLoading.next(false);
          this.snackBar.open(error.error.data, 'Dismiss', {
            duration: 3000
          });
        });
      })
      .catch((error) => {
        this.isLoading.next(false);
        if (error.message == 'There is no user record corresponding to this identifier. The user may have been deleted.') {
          this.snackBar.open('User does not exist. Please sign up.', 'Dismiss', {
            duration: 3000
          });
        } else {
          this.snackBar.open(error.message, 'Dismiss', {
            duration: 3000
          });
        }
      });
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        const data = {
          uid: result.user.uid,
          name: result.user.displayName,
          email: result.user.email
        }

        this.http.post<{ success: boolean, data: any }>(`${apiUrl}/users`, data).subscribe(result => {
          if (result.success) {
            const user = {
              firstName: result.data.firstName,
              lastName: result.data.lastName,
              email: result.data.email,
              userType: result.data.userType,
              createdDate: result.data.createdDate,
              cards: result.data.cards
            }

            this.authMe = user;
            this.authMeSub.next(this.authMe);
            this.saveAuthData(result.data.token, user);
            this.token = result.data.token;
            this.isLoading.next(false);
            this.isAuthenticatedUpdated.next(true);
            this.dialog.closeAll();

            this.snackBar.open('Welcome to Legal Hamster!', 'Dismiss', {
              duration: 3000
            })
          }
        }, error => {
          this.isLoading.next(false);
          this.snackBar.open(error.error.data, 'Dismiss', {
            duration: 3000
          });
        })
      }).catch((error) => {
        this.isLoading.next(false);
        this.snackBar.open(error.message, 'Dismiss', {
          duration: 3000
        });
      });
  }

  public getAuthMeUpdated() {
    return this.authMeSub.asObservable();
  }

  public setAuthenticationStatus(status: boolean) {
    this.isAuthenticatedUpdated.next(status);
  }

  public getIsAuthenticated() {
    return this.isAuthenticated;
  }

  public getAuthenticationStatus() {
    return this.isAuthenticatedUpdated.asObservable();
  }

  public getToken() {
    return this.token;
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.token = null;
    this.isAuthenticatedUpdated.next(false);
    this.router.navigate(['/']);
    this.snackBar.open('See you soon!', 'Dismiss', {
      duration: 3000
    });
  }

  public autoAuth() {
    const token = localStorage.getItem('token');

    if (token !== '') {
      this.token = token;
      this.isAuthenticatedUpdated.next(true);
      // this.setAuthenticationStatus(true);
    }
  }

  private saveAuthData(token: string, user: any): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  public setLoadingStatus(status: boolean) {
    this.isLoading.next(status);
  }

  public getLoadingStatus() {
    return this.isLoading.asObservable();
  }
}
