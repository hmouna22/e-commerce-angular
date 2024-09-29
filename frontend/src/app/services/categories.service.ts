import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private apiUrl = 'http://localhost:3000/api/category';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  deleteCategory(id: number): Observable<any> {
    const deleteUrl = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(deleteUrl);
  }

  addCategory(data: Category): Observable<any> {
    const addUrl = `${this.apiUrl}/new`;
    return this.http.post<any>(addUrl, data);
  }
  
}
