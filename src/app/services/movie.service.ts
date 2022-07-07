import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Movie,
  SearchMovieresponse,
} from '../common/interfaces/movie.interface';
import { Params } from '../common/interfaces/params.interface';

@Injectable()
export class MovieService {
  constructor(private http: HttpClient) {}

  getMovie(query: Params): Observable<SearchMovieresponse> {
    const params = new HttpParams()
      .set('page', query.page)
      .set('query', query.searchQuery)
      .set('api_key', environment.movieApiKey);
    return this.http
      .get<SearchMovieresponse>(environment.movieURL, { params: params })
      .pipe(
        tap((response: SearchMovieresponse) => {
          const movies = response.results;
          return movies;
        })
      );
  }
  getById(id: number): Observable<Movie> {
    const params = new HttpParams().set('api_key', environment.movieApiKey);
    return this.http
      .get<Movie>(`${environment.movieDetailsURL}/${id}`, { params: params })
      .pipe(
        map((result) => {
          return {
            ...result,
            id,
          };
        })
      );
  }

  getPopularMovies(type: string): Observable<SearchMovieresponse> {
    const params = new HttpParams()
      .set('api_key', environment.movieApiKey)
      .set('language', 'en-US')
      .set('page', 1);
    return this.http
      .get<SearchMovieresponse>(`${environment.movieDetailsURL}${type}`, {
        params: params,
      })
      .pipe(
        tap((response: SearchMovieresponse) => {
          const movies = response.results;
          return movies;
        })
      );
  }
}
