import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { Subject } from 'rxjs';
const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ExtractsService {

  private editorStatusSub = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  setEditorStatus(status: boolean) {
    this.editorStatusSub.next(status);
  }

  getEditorStatus() {
    return this.editorStatusSub.asObservable();
  }

  simplify(data: any) {
    return this.http.post<{ success: boolean, data: any }>(`${apiURL}/extracts/simplify`, data);
  }

  getExtracts() {
    return this.http.get<{ success: boolean, data: any }>(`${apiURL}/extracts`);
  }

  getExtract(data: any) {
    return this.http.get<{ success: boolean, data: any }>(`${apiURL}/extracts/id?_id=${data}`);
  }
}
