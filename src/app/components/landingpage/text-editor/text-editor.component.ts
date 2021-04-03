import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { MixpanelServiceService } from 'src/app/services/mixpanel-service.service';
import { SimplifyService } from 'src/app/services/simplify.service';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SignupComponent } from '../../auth/signup/signup.component';
import { ShowPriceComponent } from '../show-price/show-price.component';
import { EnterTitleComponent } from './enter-title/enter-title.component';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnInit, OnDestroy {
  @ViewChild('filesButton')
  filesButton: ElementRef;

  public text = '';
  private textToConvert: string = '';

  public isLoading: boolean = false;
  public conversions = [];
  public conversionsSub: Subscription;

  public isEnterTextClicked: boolean = true;
  public isUploadDocumentClicked: boolean = false;

  public editorEnabled: boolean = true;
  public editorStatusSub: Subscription;
  private isAuthenticatedStatusSub: Subscription;

  public selectedFile: File;
  public fileName: string = '';
  public fileType: string = '';


  constructor(private authService: AuthService, private mixpanelService: MixpanelServiceService, private simplifyService: SimplifyService, private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.editorStatusSub = this.simplifyService.getEditorStatus().subscribe(result => {
      this.editorEnabled = result;
    });

    this.conversionsSub = this.simplifyService.getSimplifiedData().subscribe(result => {
      this.conversions = result;
    });
  }

  onEnterTextClick() {
    this.isEnterTextClicked = true;
    this.isUploadDocumentClicked = false;
  }

  onUploadDocumentClick() {
    this.isEnterTextClicked = false;
    this.isUploadDocumentClicked = true;
  }

  onSelectFiles(event: Event) {
    this.selectedFile = (event.target as HTMLInputElement).files[0];
    this.fileName = this.selectedFile.name;

    if (this.selectedFile.type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      this.fileType = 'doc';
    } else if (this.selectedFile.type == 'application/pdf') {
      this.fileType = 'pdf'
    }
  }

  onUpload() {
    this.dialog.open(EnterTitleComponent, {
      width: '400px',
      maxHeight: '90vh',
      data: {
        file: this.selectedFile
      }
    });
  }

  onSimplify() {
    const token = localStorage.getItem('token');
    if (token == '' || token == null) {
      this.dialog.open(SignupComponent, {
        width: '500px',
        maxHeight: '90vh'
      });
      return;
    } else {
      if (this.text == '') {
        this.snackBar.open('Please enter your text and try again!', 'Dismiss', {
          duration: 3000
        });
        return;
      }

      this.textToConvert = this.text;

      this.dialog.open(ShowPriceComponent, {
        width: '400px',
        maxHeight: '90vh',
        data: {
          text: this.text,
          type: 'text'
        }
      });
    }
    this.mixpanelService.init();
    this.mixpanelService.track('Extracts Simplify Button', {
      simplifyButtonClicked: true
    });
  }

  onRemoveFile() {
    this.fileName = '';
    this.filesButton.nativeElement.value = "";
  }

  ngOnDestroy() {
    this.conversionsSub.unsubscribe();
    this.editorStatusSub.unsubscribe();
  }
}
