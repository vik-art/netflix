import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DbUser } from '../common/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
    private http: HttpClient
  ) { }

  createUser(user: DbUser): Observable<DbUser> {
    return this.http.post<DbUser>(`${environment.firebaseConfig.DBurl}/users.json`, user)
  }
  
  getUsers(email: string): Observable<any> {
    return this.http.get(`${environment.firebaseConfig.DBurl}/users.json`)
      .pipe(
        map(res => {
         return Object
           .values(res)
           .filter(res => {
           return res.email === email
          })
        })
       )
  }
  }
