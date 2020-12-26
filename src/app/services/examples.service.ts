import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';
const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ExamplesService {

  constructor(private http: HttpClient) { }

  getExamples() {
    return this.http.get<{ success: boolean, data: any }>(`${apiURL}/examples`);
  }
}
