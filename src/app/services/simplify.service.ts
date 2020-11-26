import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { environment } from './../../environments/environment';
const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class SimplifyService {

  editorStatus = new Subject<any>();

  constructor(private http: HttpClient) { }

  simplify(data) {
    return this.http.post<{ success: boolean, data: any }>(`${apiURL}/simplify`, data);
  }

  setEditorStatus(data: boolean) {
    this.editorStatus.next(data);
  }

  getEditorStatus() {
    return this.editorStatus.asObservable();
  }
}
