import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

const apiUrl = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class METAService {

  constructor(private http: HttpClient) { }

  getMETAData() {
    return this.http.get<{ success: boolean, data: any }>(`${apiUrl}/meta`);
  }
}