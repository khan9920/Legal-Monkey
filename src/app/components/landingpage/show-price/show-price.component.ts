import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConversionsService } from 'src/app/services/conversions.service';

@Component({
  selector: 'app-show-price',
  templateUrl: './show-price.component.html',
  styleUrls: ['./show-price.component.css']
})
export class ShowPriceComponent implements OnInit {

  public price: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private consersionsService: ConversionsService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.consersionsService.calculatePrice(this.data).subscribe(result => {
      if (result.success) {
        this.price = result.data
        console.log(this.price);

      }
    }, error => {
      this.snackBar.open(error.error.data, 'Dismiss', {
        duration: 3000
      });
    });
  }

  onClose(): void {
    this.dialog.closeAll();
  }
}