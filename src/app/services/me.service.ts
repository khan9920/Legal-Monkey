import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

const apiUrl = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class MeService {

  constructor(private http: HttpClient) { }

  getMe() {
    return this.http.get<{ success: boolean, data: any }>(`${apiUrl}/users`);
  }

  updateMe(data: any) {
    return this.http.put<{ success: boolean, data: any }>(`${apiUrl}/users`, data);
  }
}
