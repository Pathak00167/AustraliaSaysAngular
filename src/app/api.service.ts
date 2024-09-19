import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://localhost:7237/api'; 
  constructor(private http: HttpClient) {}
  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Auth/login`, credentials);
  }

  getUsersList(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Admin/Users-List`);
  }

  forgotPassword(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, data);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Admin/Categories-List`);
  }

  deleteCategory(id: number): Observable<any> {
    debugger
    return this.http.delete(`${this.apiUrl}/Admin/Delete-Category/${id}`);
  }

  addCategories(newCategory: { CategoryName: string }) : Observable<any> {
    return this.http.post(`${this.apiUrl}/Admin/AddorUpdate-Category`, newCategory);
  }
  updateCategory( updatedCategory: { Id:Number,CategoryName: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/Admin/AddorUpdate-Category`, updatedCategory);
  }

  getNotifications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Admin/Notifications-List`);
  }

  clearAllNotifications(): Observable<any> {
    return this.http.post(`${this.apiUrl}/Admin/MarkAllNotificationsAsSeen`, {});
  }
  
}


