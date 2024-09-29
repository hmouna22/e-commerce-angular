import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly API_URL = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) {}

  // GET all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL);
  }

  // GET a single product by ID
  getProductById(id: number): Observable<Product> {
    const url = `${this.API_URL}/${id}`;
    return this.http.get<Product>(url);
  }

  // ADD a new product
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.API_URL, product);
  }

  // UPDATE an existing product
  updateProduct(product: Product): Observable<Product> {
    const url = `${this.API_URL}/${product.product_id}`;
    return this.http.put<Product>(url, product);
  }

  // DELETE a product by ID
  deleteProduct(id: number): Observable<Product> {
    const url = `${this.API_URL}/${id}`;
    return this.http.delete<Product>(url);
  }

  submitReview(product_Id: number, reviewData: any): Observable<any> {
    const url = `${this.API_URL}/${product_Id}/reviews`;
    return this.http.post(url, reviewData);
  }
}
