import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  // ✅ REGISTER
  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  // ✅ LOGIN (matches your backend using @RequestParam)
  login(email: string, password: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/login?email=${email}&password=${password}`, {}
    );
  }

  // ✅ STORE LOGIN
  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // ✅ GET USER
  getUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  // ✅ CHECK LOGIN
  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }

  // ✅ LOGOUT
  logout() {
    localStorage.removeItem('user');
  }
}
