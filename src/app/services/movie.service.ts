import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SearchMovieresponse } from '../common/interfaces/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(
    private http: HttpClient
  ) { }

  getMovie(query: string): Observable<any> {
    return this.http.get(`${environment.movieURL}?api_key=${environment.movieApiKey}&query=${query}`)
      .pipe(
        tap((response: SearchMovieresponse) => {
          const movies = response.results;
          return movies
        }))
  }
}
 
