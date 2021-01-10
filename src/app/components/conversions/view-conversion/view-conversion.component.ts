import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConversionsService } from 'src/app/services/conversions.service';

@Component({
  selector: 'app-view-conversion',
  templateUrl: './view-conversion.component.html',
  styleUrls: ['./view-conversion.component.css']
})
export class ViewConversionComponent implements OnInit {

  public conversion: any = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private conversionsService: ConversionsService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.conversionsService.getConversion(this.data).subscribe(result => {
      if (result.success) {
        this.conversion = result.data
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
