import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { fbAuthResponse, User } from "../common/interfaces/menu.interface";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(
    private http: HttpClient
  ) { }

  get token(): string | null {
    const expDate = new Date(localStorage.getItem('fb-exp-date')!) 
      if(new Date > expDate) {
      this.logout();
        return null;
  }
  return localStorage.getItem('fb-token')
  }

 isAuthenticated(): boolean {
    return !!this.token
  }
  
  singUp(user: User): Observable<any> {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseConfig.apiKey}`, user)
      .pipe(
        tap(this.setToken)
    )
  }
  login(user: User): Observable<any> {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseConfig.apiKey}`, user)
      .pipe(
      tap(this.setToken)
    )
  }
  logout() {
   this.setToken(null)
    
  }

  private setToken(response: fbAuthResponse | null) {
    if (response) {
      const expDate = new Date(new Date().getTime() + Number(response.expiresIn) * 1000);
      localStorage.setItem('fb-token', response.idToken!);
      localStorage.setItem('fb-exp-date', expDate.toString());
    } else {
      localStorage.clear()
    }
  }
  }
