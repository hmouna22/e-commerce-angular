import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  deleteProduct(id: number): Observable<any> {
    const deleteUrl = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(deleteUrl);
  }

  updateProductStock(id: number, stock: number): Observable<any> {
    const updateUrl = `${this.apiUrl}/${id}`;
    return this.http.put<any>(updateUrl, {stock}).pipe(
      catchError((error: any) => {
        console.error('Error updating product:', error);
        return throwError('Failed to update product');
      })
    );
  }

  addProduct(data: any): Observable<any> {
    const addUrl = `${this.apiUrl}/new`;
    return this.http.post<any>(addUrl, data);
  }
  
}
