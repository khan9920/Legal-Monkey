import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ConversionsService } from 'src/app/services/conversions.service';

@Component({
  selector: 'app-conversions',
  templateUrl: './conversions.component.html',
  styleUrls: ['./conversions.component.css']
})
export class ConversionsComponent implements OnInit {

  public conversions = [];
  public recentClicked: boolean = true;
  public allClicked: boolean = false;

  constructor(private conversionsService: ConversionsService, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.conversionsService.getRecentConversions().subscribe(result => {
      if (result.success) {
        this.conversions = result.data;
      }
    }, error => {
      this.snackBar.open(error.error.data, 'Dismiss', {
        duration: 3000
      });
    });
  }

  onRecent() {
    this.recentClicked = true;
    this.allClicked = false;
    this.conversionsService.getRecentConversions().subscribe(result => {
      if (result.success) {
        this.conversions = result.data;
      }
    }, error => {
      this.snackBar.open(error.error.data, 'Dismiss', {
        duration: 3000
      });
    });
  }

  onAll() {
    this.recentClicked = false;
    this.allClicked = true;

    this.conversionsService.getAllConversions().subscribe(result => {
      if (result.success) {
        this.conversions = result.data;
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
