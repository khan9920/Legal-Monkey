import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ConversionsService {

  constructor(private http: HttpClient) { }

  getDocuments() {
    return this.http.get<{ success: boolean, data: any }>(`${apiURL}/documents`);
  }

  getDocument(ID: string) {
    return this.http.get<{ success: boolean, data: any }>(`${apiURL}/documents/id?_id=${ID}`);
  }

  getConversions() {
    return this.http.get<{ success: boolean, data: any }>(`${apiURL}/conversions`);
  }

  getConversion(ID: string) {
    return this.http.get<{ success: boolean, data: any }>(`${apiURL}/conversions/id?_id=${ID}`);
  }

  calculatePrice(data: any) {
    return this.http.post<{ success: boolean, data: any }>(`${apiURL}/price`, data);
  }
}