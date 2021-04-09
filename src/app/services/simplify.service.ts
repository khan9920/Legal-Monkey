import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

import { environment } from './../../environments/environment';
const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class SimplifyService {

  private editorStatus = new Subject<any>();
  private simplifiedDocumentSub = new Subject<any>();

  private simplifiedTextSub = new Subject<any>();
  private documentsUpdated = new Subject<any>();

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  simplify(data) {
    return this.http.post<{ success: boolean, data: any }>(`${apiURL}/extracts/simplify`, data);
  }

  setSimplifiedData(data) {
    this.simplifiedDocumentSub.next(data);
  }

  getSimplifiedData() {
    return this.simplifiedTextSub.asObservable();
  }

  uploadDocuments(data) {
    return this.http.post<{ success: boolean, data: any }>(`${apiURL}/documents`, data);
  }

  setEditorStatus(data: boolean) {
    this.editorStatus.next(data);
  }

  getEditorStatus() {
    return this.editorStatus.asObservable();
  }

  simplifyDocument(data) {
    this.http.post<{ success: boolean, data: any }>(`${apiURL}/documents/simplify`, data).subscribe(result => {
      if (result.success) {
        this.setEditorStatus(false);
        this.documentsUpdated.next(result.data);
        this.save(result.data._id, result.data.text, result.data.review);
      }
    }, error => {
      this.setEditorStatus(false);
      this.snackBar.open(error.error.data, 'Dismiss', {
        duration: 3000
      })
    });
  }

  getDocumentUpdated() {
    return this.documentsUpdated.asObservable();
  }

  calculatePrice(data: any) {
    return this.http.post<{ success: boolean, data: any }>(`${apiURL}/documents/price`, data);
  }

  public save(ID: string, Text: string, Review: string) {
    const data = {
      _id: ID,
      text: Text,
      review: Review
    }

    localStorage.setItem('extraction', JSON.stringify(data));
  }
}