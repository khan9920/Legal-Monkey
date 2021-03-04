import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { environment } from './../../environments/environment';
const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  private feedbackButtonVisible = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  giveFeedback(data: any) {
    return this.http.post<{ success: boolean, data: any }>(`${apiURL}/reviews`, data);
  }

  setFeedbackButtonVisibility(data: boolean) {
    this.feedbackButtonVisible.next(data);
  }

  getFeedbackButtonVisibility() {
    return this.feedbackButtonVisible.asObservable();
  }
}
