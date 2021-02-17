import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';
const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ExtractsService {

  constructor(private http: HttpClient) { }

  getExtracts() {
    return this.http.get<{ success: boolean, data: any }>(`${apiURL}/extracts`);
  }

  getExtract(data: any) {
    return this.http.get<{ success: boolean, data: any }>(`${apiURL}/extracts/id?_id=${data}`);
  }
}
