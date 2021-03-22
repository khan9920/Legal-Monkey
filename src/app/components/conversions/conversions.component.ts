import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as Moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { ViewConversionComponent } from './view-conversion/view-conversion.component';
import { ExtractsService } from 'src/app/services/extracts.service';
import { DocumentsService } from 'src/app/services/documents.service';
import { Subscription } from 'rxjs';
import { MeService } from 'src/app/services/me.service';

@Component({
  selector: 'app-conversions',
  templateUrl: './conversions.component.html',
  styleUrls: ['./conversions.component.css']
})
export class ConversionsComponent implements OnInit, OnDestroy {

  public extracts = [];
  public documents = [];

  public extractsClicked: boolean = true;
  public documentsClicked: boolean = false;

  public moment = Moment;

  public me: any = '';
  private meSub: Subscription;

  constructor(private authService: AuthService, private extractsService: ExtractsService, private documentsService: DocumentsService, private meService: MeService, private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.extractsService.getExtracts().subscribe(result => {
      if (result.success) {
        this.extracts = result.data;
        console.log(this.extracts);

      }
    }, error => {
      this.snackBar.open(error.error.data, 'Dismiss', {
        duration: 3000
      });
    });

    this.meService.setLoadingStatus(true);
    this.meService.getMe();
    this.meSub = this.meService.getMeUpdated().subscribe(result => {
      this.me = result;
    });
  }

  onExtracts() {
    this.extractsClicked = true;
    this.documentsClicked = false;

    this.extractsService.getExtracts().subscribe(result => {
      if (result.success) {
        this.extracts = result.data;
      }
    }, error => {
      this.snackBar.open(error.error.data, 'Dismiss', {
        duration: 3000
      });
    });
  }

  onViewExtract(ID: string) {
    this.dialog.open(ViewConversionComponent, {
      width: '600px',
      maxHeight: '90vh',
      data: ID
    });
  }

  onDocuments() {
    this.extractsClicked = false;
    this.documentsClicked = true;

    this.documentsService.getDocuments().subscribe(result => {
      if (result.success) {
        this.documents = result.data;
      }
    }, error => {
      this.snackBar.open(error.error.data, 'Dismiss', {
        duration: 3000
      });
    });
  }

  onViewDocument(ID: string) {
    this.documentsService.getDocument(ID).subscribe(result => {
      if (result.success) {
        const data = {
          _id: result.data._id,
          text: result.data.text,
        }
        localStorage.setItem('extraction', JSON.stringify(data));
        this.router.navigate(['/editor']);
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

  ngOnDestroy() {
    this.meSub.unsubscribe();
  }
}
