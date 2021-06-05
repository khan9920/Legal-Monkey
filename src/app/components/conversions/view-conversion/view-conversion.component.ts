import { Component, Inject, OnInit } from '@angular/core';

import { ExtractsService } from 'src/app/services/extracts.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-conversion',
  templateUrl: './view-conversion.component.html',
  styleUrls: ['./view-conversion.component.scss']
})
export class ViewConversionComponent implements OnInit {

  public extract: any = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private extractsService: ExtractsService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.extractsService.getExtract(this.data).subscribe(result => {
      if (result.success) {
        this.extract = result.data
      }
    }, error => {
      this.snackBar.open(error.error.data, 'Dismiss', {
        duration: 3000
      });
    });
  }

  onClose() {
    this.dialog.closeAll();
  }
}