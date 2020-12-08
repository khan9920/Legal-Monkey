import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../auth/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isAuthenticated: boolean = false;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  onLogin() {
    this.dialog.open(LoginComponent, {
      width: '400px'
    });
  }
}
