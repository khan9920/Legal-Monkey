import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/components/auth/login/login.component';
import { ShowPriceComponent } from '../../show-price/show-price.component';
import { UploadDocumentComponent } from '../../document-conversion/upload-document/upload-document.component';
import { METAService } from 'src/app/services/meta.service';

@Component({
  selector: 'app-simple-editor',
  templateUrl: './simple-editor.component.html',
  styleUrls: ['./simple-editor.component.scss']
})
export class SimpleEditorComponent implements OnInit {

  public isLoading: boolean = false;
  private token: string = '';
  private META_DATA: any;

  constructor(private META: METAService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // get token from local storage
    this.token = localStorage.getItem('token');

    this.META_DATA = this.META.getMETAData().subscribe(result => {
      if (result.success) {
        this.META_DATA = result.data;
      }
    }, error => {
      this.snackBar.open(error.error.data, 'Dismiss', {
        duration: 3000
      });
    });
  }

  onSimplify(form: NgForm) {
    // set loading status to true
    this.isLoading = true;

    // check whether the input text is empty
    if (form.value.text == '') {
      // set loading status to false
      this.isLoading = false;

      // show message to user
      this.snackBar.open('Please paste a paragraph and click on translate!', 'Dismiss', {
        duration: 3000
      });

      // stop execution
      return;
    }

    if (form.value.text.length < this.META_DATA.textLimits.MINIMUM) {
      // set loading status to false
      this.isLoading = false;

      this.snackBar.open('This seems too short to be a clause', 'Dismiss', {
        duration: 3000
      });

      return;
    } else if (form.value.text.length > this.META_DATA.textLimits.MAXIMUM) {
      // set loading status to false
      this.isLoading = false;

      this.snackBar.open('This seems too long to be a clause. Try our document upload service', 'Dismiss', {
        duration: 3000
      });

      return;
    }

    if (this.token == '' || this.token == null) {
      // set loading status to false
      this.isLoading = false;

      // open sign in dialog
      this.dialog.open(LoginComponent, {
        width: '450px',
        maxHeight: '90vh'
      });

      // show message to user
      this.snackBar.open('Please login to continue!', 'Dismiss', {
        duration: 300
      });

      // stop execution
      return;
    }

    this.dialog.open(ShowPriceComponent, {
      width: '400px',
      maxHeight: '90vh',
      data: {
        text: form.value.text,
        type: 'text'
      }
    });
  }

  onUpload() {
    this.dialog.open(UploadDocumentComponent, {
      width: '600px',
      maxHeight: '90vh'
    });
  }
}