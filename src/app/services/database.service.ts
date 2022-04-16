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

  createUser(user: DbUser): Observable<User> {
    return this.http.post<User>(`${environment.firebaseConfig.DBurl}/users.json`, user)
  }
  
  getUser(): Observable<Array<any> | null> {
    return this.http.get<Array<any>>(`${environment.firebaseConfig.DBurl}/users.json`)
      .pipe(
        map((response: { [key: string]: any }) => {
          if (response) {
            return Object.entries(response)
          } else {
            return null;
          }
        }))
  }

  getMovies(id: string, type: string):Observable<number[] | null> {
    return this.http.get<Movie>((`${environment.firebaseConfig.DBurl}/users/${id}/${type}.json`))
      .pipe(
        map((response ) => {
          if (response) {
            return Object
            .values(response)
            .map((key) => key.id)
          } else {
            return null
          }
        }
      )
    )
  }

  getUserMovies(id: string, type: string): Observable<Movie[] | null> {
    return this.http.get<Movie[]>((`${environment.firebaseConfig.DBurl}/users/${id}/${type}.json`))
      .pipe(
        map((response) => {
          return response ? response : null;
        }
      )
    )
  }


  updateData(movie: Movie, id: string, type: string): Observable<Movie> {
    return this.http.post<Movie>(`${environment.firebaseConfig.DBurl}/users/${id}/${type}.json`, movie)
  }

  deleteData(movie: string, id: string, type: string): Observable<void> {
    return this.http.delete<void>(`${environment.firebaseConfig.DBurl}/users/${id}/${type}/${movie}.json`)
  }
  }
