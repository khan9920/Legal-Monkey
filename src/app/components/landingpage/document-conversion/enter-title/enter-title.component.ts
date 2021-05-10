import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SimplifyService } from 'src/app/services/simplify.service';
import { MixpanelServiceService } from 'src/app/services/mixpanel-service.service';
import { METAService } from 'src/app/services/meta.service';

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-enter-title',
  templateUrl: './enter-title.component.html',
  styleUrls: ['./enter-title.component.scss']
})
export class EnterTitleComponent implements OnInit {

  public isLoading: boolean = false;
  public title: string = '';
  public isTitleValid: boolean = true;

  public agreementType: string = '';
  public isTypeValid: boolean = true;

  public types: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private simplifyService: SimplifyService,
    private mixpanelService: MixpanelServiceService,
    private META: METAService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.META.getMETAData().subscribe(result => {
      if (result.success) {
        this.types = result.data.agreementTypes;
        this.agreementType = this.types[0];
      }
    });
  }

  onUpload() {
    this.isLoading = true;

    if (this.title == '' || this.agreementType == '') {
      this.isTitleValid = false;
      this.isLoading = false;
      console.log(this.agreementType);

    } else {
      const data = new FormData();

      data.append('document', this.data.file);
      data.append('title', this.title);
      data.append('agreementType', this.agreementType);

      this.simplifyService.uploadDocuments(data).subscribe(result => {
        if (result.success) {
          this.isLoading = false;
          this.dialog.closeAll();
          localStorage.setItem('extraction', JSON.stringify(result.data));
          this.mixpanelService.init();
          this.mixpanelService.track('Document Converted', {
            verified: true
          });
          this.router.navigate(['/documents']);
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
