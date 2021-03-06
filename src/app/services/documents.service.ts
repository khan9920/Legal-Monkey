import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';
const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  constructor(private http: HttpClient) { }

  getDocuments() {
    return this.http.get<{ success: boolean, data: any }>(`${apiURL}/documents`);
  }

  getDocument(data: any) {
    return this.http.get<{ success: boolean, data: any }>(`${apiURL}/documents/id?_id=${data}`);
  }
}
