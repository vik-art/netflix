import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, Subject, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { fbAuthResponse } from "../common/interfaces/auth.interface";
import { User } from "../common/interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public error$: Subject<string> = new Subject<string>()

  constructor(
    private http: HttpClient
  ) { }

  get token(): string {
    const expDate = new Date(localStorage.getItem('fb-exp-date')!) 
      if(new Date > expDate) {
      this.logout();
        return "";
  }
  return localStorage.getItem('fb-token')!
  }

 isAuthenticated(): boolean {
    return !!this.token
  }
  
  signUp(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http.post<fbAuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseConfig.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
    )
  }
  login(user: User): Observable<any> {
     user.returnSecureToken = true;
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseConfig.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
    )
  }
  logout() {
   this.setToken(null)
    
  }

  private setToken(response: fbAuthResponse | null) {
    if (response) {
      console.log(response)
      const expDate = new Date(new Date().getTime() + Number(response.expiresIn) * 1000);
      localStorage.setItem('fb-token', response.idToken!);
      localStorage.setItem('fb-exp-date', expDate.toString());
    } else {
      localStorage.clear()
    }
  }

  private handleError(error: HttpErrorResponse) {
    const { message } = error.error.error;

    switch (message) {
      case "EMAIL_NOT_FOUND":
        this.error$.next("This email hasn't been found");
        break;
      case "INVALID_PASSWORD":
        this.error$.next("This password is invalid");
        break;
      case "INVALID_EMAIL":
        this.error$.next("This email is invalid");
        break;
    }
    return throwError(error)
  }
  }
