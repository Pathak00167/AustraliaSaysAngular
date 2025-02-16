import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://192.168.47.217:5112/api';   //   192.168.208.217
  constructor(private http: HttpClient) {}

  //#region   Admin Apis
  getUsersList(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Admin/Users-List`);
  }

  

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Admin/Categories-List`);
  }

  deleteCategory(id: number): Observable<any> {
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

  getArticles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Admin/ArticlesList`);
  }

  addArticle(article: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Admin/AddArticle`, article);
  }

  updateArticle(id: number, article: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, article);
  }

  deleteArticle(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  //#endregion
  
//#region   Authenication Apis
login(credentials: { email: string, password: string }): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/Auth/login`, credentials);
}

forgotPassword(data: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/forgot-password`, data);
}

getUserIdFromToken(): string  {
  const token = sessionStorage.getItem('token');
  if (token) {
    const decodedToken: any = jwtDecode(token);
    console.log('Decoded Token:', decodedToken);
    return decodedToken.sub;  
  }
  return "";
}

//#endregion

  //#region RegistrationStepProcessApis
  registerUser(user: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Auth/Register-User`, user);
  }

  VerifyOtp(user: { email: string, otp: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Auth/Verify-Otp`, user);
  }
  UserUniqueName(user: FormData): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/User/Update-UserProfile`, user);
  }

  EnhanceProfile(profileData: FormData): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/User/Update-UserProfile`, profileData);
  }

  GetUserProfile(userId: string): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/User/Get-UserProfile/${userId}`);
  }

  GetUserFriends(userId: string): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/User/Get-UserFriends/${userId}`);
  }
  //#endregion

  //#region  FriendRequest Page
  getRandomUsers(userId: string): Observable<any[]> {debugger
    return this.http.get<any[]>(`${this.apiUrl}/User/random-users/${userId}`);
  }

  sendFriendRequest(data: { senderId: string; receiverId: string }) {
    return this.http.post(`${this.apiUrl}/User/send`, data);
  }
  //http://192.168.250.217:5112/api/User/Pending-Request/2
getPendingRequests(userId:string):Observable<any[]>{
  return this.http.get<any[]>(`${this.apiUrl}/User/Pending-Request/${userId}`);
}

acceptFriendRequest(data: { senderId: string; receiverId: string }):Observable<any>{
  return this.http.post(`${this.apiUrl}/User/accept-Request`,data)
}

declineFriendRequest(data:{senderId:string;receiverId:string}):Observable<any>{
  return this.http.post(`${this.apiUrl}/User/reject-Request`,data)
}
//#endregion

 
}
