import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SimplifyService } from 'src/app/services/simplify.service';
import { MixpanelServiceService } from 'src/app/services/mixpanel-service.service';

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-enter-title',
  templateUrl: './enter-title.component.html',
  styleUrls: ['./enter-title.component.css']
})
export class EnterTitleComponent implements OnInit {

  public isLoading: boolean = false;
  public title: string = '';
  public isTitleValid: boolean = true;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private simplifyService: SimplifyService, private mixpanelService: MixpanelServiceService, private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onUpload() {
    this.isLoading = true;

    if (this.title == '') {
      this.isTitleValid = false;
      this.isLoading = false;
    } else {
      const data = new FormData();

      data.append('document', this.data.file);
      data.append('title', this.title);

      this.simplifyService.uploadDocuments(data).subscribe(result => {
        if (result.success) {
          this.isLoading = false;
          const data = {
            _id: result.data._id,
            text: result.data.text,
          }
          this.dialog.closeAll();
          localStorage.setItem('extraction', JSON.stringify(data));
          this.mixpanelService.init();
          this.mixpanelService.track('Document Converted', {
            verified: true
          });
          this.router.navigate(['/editor']);
        }
      }, error => {
        this.isLoading = false;
        this.snackBar.open(error.error.data, 'Dismiss', {
          duration: 3000
        });
      });
    }
  }

  onClose() {
    this.dialog.closeAll();
  }
}
