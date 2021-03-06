import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ReviewsService } from 'src/app/services/reviews.service';
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
  private feedbackButtonVisibleSub: Subscription;

  constructor(private simplifyService: SimplifyService, private reviewsService: ReviewsService, private dialog: MatDialog) { }

  ngOnInit() {
    this.feedbackButtonVisibleSub = this.reviewsService.getFeedbackButtonVisibility().subscribe(result => {
      this.feedbackButtonVisible = result;
    });

    const convertedText = JSON.parse(localStorage.getItem('convertedText'));
    this.conversions = convertedText.conversions;

    if (convertedText.review == true) {
      this.feedbackButtonVisible = false;
    }
  }

  onSimplify() {
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
    this.feedbackButtonVisibleSub.unsubscribe();
  }
}