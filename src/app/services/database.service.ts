import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from '../common/interfaces/movie.interface';
import { DbUser, User } from '../common/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
    private http: HttpClient
  ) { }

  createUser(user: DbUser): Observable<any> {
   return this.http.post(`${environment.firebaseConfig.DBurl}/users.json`, user)
  }
  
  getUsers(): Observable<any> {
    return this.http.get(`${environment.firebaseConfig.DBurl}/users.json`)
      .pipe(
        map((response: { [key: string]: any }) => {
          return Object
            .keys(response)
            .map((key) => ({
            id: key
          }))
       })
        )
       
  }

  updateData(movie: Movie, id: string): Observable<any> {
   return this.http.post(`${environment.firebaseConfig.DBurl}/users/${id}/favourite.json`, movie)
  }
  }
