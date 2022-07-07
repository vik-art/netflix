import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Error } from '../common/enums/errors.enum';
import { Message } from '../common/enums/message.enums';
import { fbAuthResponse } from '../common/interfaces/auth.interface';
import { User } from '../common/interfaces/user.interface';

@Injectable()
export class AuthService {
  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {}

  get token(): string {
    const expDate = new Date(localStorage.getItem('fb-exp-date')!);
    if (new Date() > expDate) {
      this.logout();
      return '';
    }
    return localStorage.getItem('fb-token')!;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  signUp(user: User): Observable<fbAuthResponse | null> {
    user.returnSecureToken = true;
    const params = new HttpParams().set(
      'key',
      environment.firebaseConfig.apiKey
    );
    return this.http
      .post<fbAuthResponse | null>(
        `${environment.firebaseConfig.url}:signUp`,
        user,
        { params: params }
      )
      .pipe(tap(this.setToken), catchError(this.handleError.bind(this)));
  }
  login(user: User): Observable<fbAuthResponse | null> {
    const params = new HttpParams().set(
      'key',
      environment.firebaseConfig.apiKey
    );
    user.returnSecureToken = true;
    return this.http
      .post<fbAuthResponse | null>(
        `${environment.firebaseConfig.url}:signInWithPassword`,
        user,
        { params: params }
      )
      .pipe(tap(this.setToken), catchError(this.handleError.bind(this)));
  }
  logout() {
    this.setToken(null);
  }

  private setToken(response: fbAuthResponse | null) {
    if (response) {
      const expDate = new Date(
        new Date().getTime() + Number(response.expiresIn) * 1000
      );
      localStorage.setItem('fb-token', response.idToken!);
      localStorage.setItem('fb-exp-date', expDate.toString());
    } else {
      localStorage.clear();
    }
  }

  private handleError(error: HttpErrorResponse) {
    const { message } = error.error.error;
    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('This email is invalid');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('This password is invalid');
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next(`This email hasn't been found. Maybe you should `);
        break;
      case 'EMAIL_EXISTS':
        this.error$.next('This email was used for registration before');
        break;
    }
    return throwError(error);
  }
}
