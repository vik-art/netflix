import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie, SearchMovieresponse } from '../common/interfaces/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(
    private http: HttpClient
  ) { }

  getMovie(query: string, page: number): Observable<SearchMovieresponse> {
    return this.http.get<SearchMovieresponse>(`${environment.movieURL}?api_key=${environment.movieApiKey}&query=${query}&page=${page}`)
      .pipe(
        tap((response: SearchMovieresponse) => {
          const movies = response.results;
          return movies
        }))
  }
  getById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${environment.movieDetailsURL}/${id}?api_key=${environment.movieApiKey}`)
      .pipe(map(result => {
        return {
          ...result,
          id
        }
      })      
    )
  }
}
 
