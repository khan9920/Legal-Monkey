import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConversionsService } from 'src/app/services/conversions.service';
import { ExtractsService } from 'src/app/services/extracts.service';
import { SimplifyService } from 'src/app/services/simplify.service';
import { AddCardComponent } from '../../account/add-card/add-card.component';

@Component({
  selector: 'app-show-price',
  templateUrl: './show-price.component.html',
  styleUrls: ['./show-price.component.scss']
})
export class ShowPriceComponent implements OnInit {

  public price: number;
  public wordCount: number;
  public isLoading: Boolean = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private consersionsService: ConversionsService, private simplifyService: SimplifyService, private extractsService: ExtractsService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.isLoading = true;

    if (this.data.type == 'text') {
      const data = {
        text: this.data.text
      }

      this.consersionsService.calculatePrice(data).subscribe(result => {
        if (result.success) {
          this.isLoading = false;

          if (result.data.price === 0) {
            this.onContinue('text');
          }
          this.price = result.data.price;
          this.wordCount = result.data.words;
        }
      }, error => {
        this.isLoading = false;
        this.dialog.closeAll();
        this.snackBar.open(error.error.data, 'Dismiss', {
          duration: 3000
        });
      });
    } else if (this.data.type == 'document') {

      const data = {
        _id: this.data._id,
        text: this.data.text
      }

      this.simplifyService.calculatePrice(data).subscribe(result => {
        if (result.success) {
          this.isLoading = false;
          if (result.data.price === 0) {
            this.onContinue('document');
          }
          this.price = result.data.price;
          this.wordCount = result.data.words;
        }
      }, error => {
        this.isLoading = false;
        this.dialog.closeAll();
        this.snackBar.open(error.error.data, 'Dismiss', {
          duration: 3000
        });
      });
    }
  }

  onContinue(type: string): void {
    if (type == 'text') {
      this.isLoading = true;

      const data = {
        text: this.data.text
      }

      this.extractsService.simplify(data).subscribe(result => {
        if (result.success) {
          this.isLoading = false;
          this.dialog.closeAll();
          this.extractsService.setEditorStatus(false);
          const data = {
            original: this.data.text,
            conversions: result.data.conversions
          }
          localStorage.setItem('simpleExtraction', JSON.stringify(data));
        }
      }, error => {
        this.isLoading = false;
        this.dialog.closeAll();
        if (error.error.cards == false) {
          this.dialog.open(AddCardComponent, {
            width: '400px',
            maxHeight: '90vh'
          });

          this.snackBar.open('Please enter a payment method', 'Dismiss', {
            duration: 3000
          });
        } else {
          this.snackBar.open(error.error.data, 'Dismiss', {
            duration: 3000
          });
        }
      });
    } else if (type == 'document') {
      this.simplifyService.setEditorStatus(true);
      const data = {
        _id: this.data._id,
        text: this.data.text
      }

      this.simplifyService.save(this.data._id, this.data.text, this.data.review);
      this.simplifyService.simplifyDocument(data);

      this.dialog.closeAll();
    }
  }

  onClose(): void {
    this.dialog.closeAll();
  }
}