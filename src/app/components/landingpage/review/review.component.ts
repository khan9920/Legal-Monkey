import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReviewsService } from 'src/app/services/reviews.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  public emojiStatus = {
    terrible: false,
    bad: false,
    okay: false,
    good: false,
    great: false
  }

  public validation = {
    rating: true,
    review: true
  }

  public emptyReview: boolean = false;

  public rating: number = 0;
  public review: string = '';

  public isLoading: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public type: any, private reviewsService: ReviewsService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onEmojiClicked(type: string) {
    if (type == 'terrible') {
      this.emojiStatus.terrible = true;
      this.emojiStatus.bad = false;
      this.emojiStatus.okay = false;
      this.emojiStatus.good = false;
      this.emojiStatus.great = false;

      this.rating = 1;
    } else if (type == 'bad') {
      this.emojiStatus.terrible = false;
      this.emojiStatus.bad = true;
      this.emojiStatus.okay = false;
      this.emojiStatus.good = false;
      this.emojiStatus.great = false;

      this.rating = 2;
    } else if (type == 'okay') {
      this.emojiStatus.terrible = false;
      this.emojiStatus.bad = false;
      this.emojiStatus.okay = true;
      this.emojiStatus.good = false;
      this.emojiStatus.great = false;

      this.rating = 3;
    } else if (type == 'good') {
      this.emojiStatus.terrible = false;
      this.emojiStatus.bad = false;
      this.emojiStatus.okay = false;
      this.emojiStatus.good = true;
      this.emojiStatus.great = false;

      this.rating = 4;
    } else if (type == 'great') {
      this.emojiStatus.terrible = false;
      this.emojiStatus.bad = false;
      this.emojiStatus.okay = false;
      this.emojiStatus.good = false;
      this.emojiStatus.great = true;

      this.rating = 5;
    }
  }

  onSubmit() {
    this.isLoading = true;

    this.onValidate();

    if (!this.validation.rating || !this.validation.review) {
      this.isLoading = false;
      return;
    }

    let reference = '';

    if (this.type = 'Extract') {
      const convertedText = JSON.parse(localStorage.getItem('convertedText'));
      reference = convertedText._id;
    } else if (this.type = 'Document') {
      const convertedText = JSON.parse(localStorage.getItem('extraction'));
      reference = convertedText._id;
    }

    const data = {
      reference: reference,
      rating: this.rating,
      review: this.review,
      type: this.type
    }

    this.reviewsService.giveFeedback(data).subscribe(result => {
      if (result.success) {
        this.isLoading = false;
        this.reviewsService.setFeedbackButtonVisibility(false);
        this.dialog.closeAll();
        this.snackBar.open('Thank you for your feedback!', 'Dismiss', {
          duration: 3000
        });
      }
    }, error => {
      this.isLoading = false;
      this.snackBar.open(error.error.error, 'Dismiss', {
        duration: 3000
      });
    });
  }

  private onValidate() {
    if (this.rating == 0) {
      this.snackBar.open('Please select your experience!', 'Dismiss', {
        duration: 3000
      });
      this.validation.rating = false;

    } else {
      this.validation.rating = true;
    }

    if (this.review == '') {
      this.validation.review = false
    } else {
      this.validation.review = true;
    }
  }

  onClose() {
    this.dialog.closeAll();
  }
}
