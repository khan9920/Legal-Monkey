import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public profileClicked: boolean = true;
  public paymentOptionsClicked: boolean = false;
  public changePasswordClicked: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onProfile() {
    this.profileClicked = true;
    this.paymentOptionsClicked = false;
    this.changePasswordClicked = false;
  }

  onPaymentOptions() {
    this.profileClicked = false;
    this.paymentOptionsClicked = true;
    this.changePasswordClicked = false;
  }

  onChangePassword() {
    this.profileClicked = false;
    this.paymentOptionsClicked = false;
    this.changePasswordClicked = true;
  }

  onBackToHome() {
    this.router.navigate(['/']);
  }

}
