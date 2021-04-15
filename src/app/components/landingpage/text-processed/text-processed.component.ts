import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { SimplifyService } from 'src/app/services/simplify.service';
import { ReviewComponent } from '../review/review.component';

@Component({
  selector: 'app-text-processed',
  templateUrl: './text-processed.component.html',
  styleUrls: ['./text-processed.component.css']
})
export class TextProcessedComponent implements OnInit, OnDestroy {

  public conversions: [];

  public feedbackButtonVisible: boolean = true;
  private feedbackButtnSub: Subscription;

  constructor(private simplifyService: SimplifyService, private dialog: MatDialog) { }

  ngOnInit() {
    const convertedText = JSON.parse(localStorage.getItem('convertedText'));
    this.conversions = convertedText.conversions;

    this.feedbackButtonVisible = convertedText.review;

    this.feedbackButtnSub = this.simplifyService.getFeedbackButtonVisibility().subscribe(result => {
      this.feedbackButtonVisible = result;
    });
  }

  onGoBack() {
    this.simplifyService.setEditorStatus(true);
  }

  onReview() {
    this.dialog.open(ReviewComponent, {
      width: '500px',
      maxHeight: '90vh',
      data: 'Extract'
    });
  }

  ngOnDestroy() {
    this.feedbackButtnSub.unsubscribe();
  }
}