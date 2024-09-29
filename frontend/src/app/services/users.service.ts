import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  deleteUser(id: number): Observable<any> {
    const deleteUrl = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(deleteUrl);
  }

  updateUserToAdmin(id: number): Observable<any> {
    const updateUrl = `${this.apiUrl}/${id}`;
    let role = "admin"
    return this.http.put<any>(updateUrl, {role})
  }

  updateUserToCustomer(id: number): Observable<any> {
    const updateUrl = `${this.apiUrl}/${id}`;
    let role = "customer"
    return this.http.put<any>(updateUrl, {role})
  }

}