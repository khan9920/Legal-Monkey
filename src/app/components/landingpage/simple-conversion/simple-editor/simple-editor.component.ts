import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ExtractsService } from 'src/app/services/extracts.service';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-simple-editor',
  templateUrl: './simple-editor.component.html',
  styleUrls: ['./simple-editor.component.scss']
})
export class SimpleEditorComponent implements OnInit {

  public isLoading: boolean = false;

  constructor(private extractsService: ExtractsService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onSimplify(form: NgForm) {
    this.isLoading = true;
    if (form.value.text == '') {
      this.isLoading = false;
      this.snackBar.open('Please paste a paragraph and click on translate!', 'Dismiss', {
        duration: 3000
      });
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