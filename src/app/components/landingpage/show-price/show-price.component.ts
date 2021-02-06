import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConversionsService } from 'src/app/services/conversions.service';
import { SimplifyService } from 'src/app/services/simplify.service';

@Component({
  selector: 'app-show-price',
  templateUrl: './show-price.component.html',
  styleUrls: ['./show-price.component.css']
})
export class ShowPriceComponent implements OnInit {

  public price: number;
  public wordCount: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private consersionsService: ConversionsService, private simplifyService: SimplifyService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.consersionsService.calculatePrice(this.data).subscribe(result => {
      if (result.success) {
        if (result.data.price === 0) {
          this.onContinue();
        }
        this.price = result.data.price;
        this.wordCount = result.data.words;
      }
    }, error => {
      this.snackBar.open(error.error.data, 'Dismiss', {
        duration: 3000
      });
    });
  }

  onContinue(): void {

    console.log(this.data);

    this.simplifyService.simplify(this.data).subscribe(result => {
      if (result.success) {
        this.dialog.closeAll();
        console.log(result.data);

      }
    });
  }

  onClose(): void {
    this.dialog.closeAll();
  }
}