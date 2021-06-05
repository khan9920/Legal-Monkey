import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { MeService } from 'src/app/services/me.service';
import { DocumentsService } from 'src/app/services/documents.service';
import { ExtractsService } from 'src/app/services/extracts.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { ViewConversionComponent } from './view-conversion/view-conversion.component';

import * as Moment from 'moment';

@Component({
  selector: 'app-conversions',
  templateUrl: './conversions.component.html',
  styleUrls: ['./conversions.component.scss']
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
        localStorage.setItem('extraction', JSON.stringify(result.data));
        this.router.navigate(['/documents']);
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
