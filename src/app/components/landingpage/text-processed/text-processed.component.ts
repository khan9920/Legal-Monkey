import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { SimplifyService } from 'src/app/services/simplify.service';
import { ReviewComponent } from '../review/review.component';

@Component({
  selector: 'app-text-processed',
  templateUrl: './text-processed.component.html',
  styleUrls: ['./text-processed.component.css']
})
export class TextProcessedComponent implements OnInit {

  public conversions: [];

  public feedbackButtonVisible: boolean = true;

  constructor(private simplifyService: SimplifyService, private dialog: MatDialog) { }

  ngOnInit() {
    const convertedText = JSON.parse(localStorage.getItem('convertedText'));
    this.conversions = convertedText.conversions;

    this.feedbackButtonVisible = convertedText.review;

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
}