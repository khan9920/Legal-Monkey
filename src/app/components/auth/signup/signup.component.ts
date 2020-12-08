import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user = {
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  }

  public userValidation = {
    firstName: 'valid',
    lastName: 'valid',
    email: 'valid',
    mobile: 'valid',
    password: 'valid',
    confirmPassword: 'valid',
  }

  constructor(private authService: AuthService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onSignUp() {
    if (this.user.firstName == '' || this.user.lastName == '' || this.user.email == '' || this.user.mobile == '' || this.user.password == '' || this.user.confirmPassword == '') {
      this.snackBar.open('All fields are required.', 'Dismiss', {
        duration: 3000
      });
      return;
    } else if (this.user.password !== this.user.confirmPassword) {
      this.snackBar.open('Passwords do not match', 'Dismiss', {
        duration: 3000
      });
      return;
    } else {
      const user = {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        mobile: this.user.mobile,
        password: this.user.password
      }
      this.authService.signUp(user);
    }
  }

  onLogin(): void {
    this.dialog.closeAll();
    this.dialog.open(LoginComponent, {
      width: '400px',
      maxHeight: '90vh'
    });
  }
}
