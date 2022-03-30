import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/common/interfaces/movie.interface';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  searchQuery!: string;
  page: number = 1;
  movies: Array<Movie> = [];
  movie!: Movie;
  zeroResult: boolean = false;
  loader: boolean = false;
  movieSub!: Subscription;
  moreSub!: Subscription;
  openPage: boolean = false;

  constructor(
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  ngOnDestroy(): void {
    if (this.movieSub) {
      this.movieSub.unsubscribe()
    }
    if (this.moreSub) {
      this.moreSub.unsubscribe()
    }
  }

  initForm() {
    this.form = new FormGroup({
      query: new FormControl('', Validators.required)
    })
    this.form.valueChanges.subscribe(() => {
      if (this.searchQuery !== this.form.value.query) {
      this.movies = [];
        this.page = 1;
    }
      this.searchQuery = this.form.value.query;
    })
  }
  submit() {
    const queryParams = {
     searchQuery: this.searchQuery,
      page: this.page,
    }
    this.loader = true;
    this.movieSub = this.movieService.getMovie(queryParams)
     .subscribe((movies) => {
       this.movies = movies.results as Array<Movie>;
       this.page++;
       this.loader = false;
     })
  }
  loadMoreMovies() {
    const queryParams = {
     searchQuery: this.searchQuery,
     page: this.page
    }
    this.loader = true;
    this.moreSub = this.movieService.getMovie(queryParams)
     .subscribe((movies) => {
        this.movies = [...this.movies, ...movies.results as Array<Movie>];
       this.page++;
       this.loader = false;
     })
  }

  openMoviePage(event: number) {
    return this.movieService.getById(event)
       .subscribe((movie: Movie) => {
        this.openPage = true;
         this.movie = movie;
       })    
  }

  onClose() {
    this.openPage = false;
  }
}
