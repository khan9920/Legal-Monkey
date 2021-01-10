import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ConversionsService } from 'src/app/services/conversions.service';
import * as Moment from 'moment';

@Component({
  selector: 'app-conversions',
  templateUrl: './conversions.component.html',
  styleUrls: ['./conversions.component.css']
})
export class ConversionsComponent implements OnInit {

  public conversions = [];
  public documents = [];
  public conversionsClicked: boolean = true;
  public documentsClicked: boolean = false;
  public moment = Moment;

  constructor(private conversionsService: ConversionsService, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.conversionsService.getConversions().subscribe(result => {
      if (result.success) {
        this.conversions = result.data;
      }
    }, error => {
      this.snackBar.open(error.error.data, 'Dismiss', {
        duration: 3000
      });
    });
  }

  onConversions() {
    this.conversionsClicked = true;
    this.documentsClicked = false;

    this.conversionsService.getConversions().subscribe(result => {
      if (result.success) {
        this.conversions = result.data;
      }
    }, error => {
      this.snackBar.open(error.error.data, 'Dismiss', {
        duration: 3000
      });
    });
  }

  onDocuments() {
    this.conversionsClicked = false;
    this.documentsClicked = true;

    this.conversionsService.getDocuments().subscribe(result => {
      if (result.success) {
        this.documents = result.data;
      }
    }, error => {
      this.snackBar.open(error.error.data, 'Dismiss', {
        duration: 3000
      });
    });
  }

  onBackToHome() {
    this.router.navigate(['/']);
  }

  onLogout(): void {
    this.authService.logout();
  }
}
