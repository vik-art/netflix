import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Movie } from 'src/app/common/interfaces/movie.interface';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss']
})
export class MoviePageComponent implements OnInit, OnDestroy {
  movie!: Movie;
  movieSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    const movieSub = this.route.params
      .pipe(switchMap((params: Params) => {
      return this.movieService.getById(params['id'])
      }))
      .subscribe((movie: Movie) => {
        this.movie = {
          ...movie,
          favourite: false,
          selected: false
        };
    })
  }

  ngOnDestroy(): void {
    if (this.movieSub) {
      this.movieSub.unsubscribe()
    }
  }

}
