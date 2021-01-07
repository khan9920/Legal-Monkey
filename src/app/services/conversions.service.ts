import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ConversionsService {

  constructor(private http: HttpClient) { }

  getRecentConversions() {
    return this.http.get<{ success: boolean, data: any }>(`${apiURL}/conversions/recent`);
  }

  getAllConversions() {
    return this.http.get<{ success: boolean, data: any }>(`${apiURL}/examples`);
  }
}
