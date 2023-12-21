import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FruitsService {
  private apiUrl: string = 'http://localhost:9005/fruits';

  constructor(protected http: HttpClient) {}

  list(page: number = 1, per_page: number = 5): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&per_page=${per_page}`);
  }

  get(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  new(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  update(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${data.id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
