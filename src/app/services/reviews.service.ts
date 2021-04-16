import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { environment } from './../../environments/environment';
const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private http: HttpClient) { }

  giveFeedback(data: any) {
    return this.http.post<{ success: boolean, data: any }>(`${apiURL}/reviews`, data);
  }
}
