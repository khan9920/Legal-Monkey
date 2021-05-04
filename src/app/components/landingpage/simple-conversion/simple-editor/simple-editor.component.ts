import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ExtractsService } from 'src/app/services/extracts.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/components/auth/login/login.component';

@Component({
  selector: 'app-simple-editor',
  templateUrl: './simple-editor.component.html',
  styleUrls: ['./simple-editor.component.scss']
})
export class SimpleEditorComponent implements OnInit {

  public isLoading: boolean = false;
  private token: string = '';

  constructor(private extractsService: ExtractsService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // get token from local storage
    this.token = localStorage.getItem('token');
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

    this.extractsService.simplify(form.value).subscribe(result => {
      if (result.success) {
        this.isLoading = false;
        this.extractsService.setEditorStatus(false);
        localStorage.setItem('simpleExtraction', result.data);
      }
    }, error => {
      this.isLoading = false;
      this.snackBar.open(error.error.error, 'Dismiss', {
        duration: 3000
      });
    });
  }
}