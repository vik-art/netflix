import { Component, OnDestroy, OnInit } from '@angular/core';
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
  zeroResult: boolean = false;
  movieSub!: Subscription;
  moreSub!: Subscription;

  constructor(
    private movie: MovieService
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
     page: this.page
    }
    const mSub = this.movie.getMovie(queryParams)
     .subscribe((movies) => {
      this.movies = movies.results as Array<Movie>;
       this.page++;
     })
  }
  loadMoreMovies() {
    const queryParams = {
     searchQuery: this.searchQuery,
     page: this.page
    }
    const mSub = this.movie.getMovie(queryParams)
     .subscribe((movies) => {
        this.movies = [...this.movies, ...movies.results as Array<Movie>];
       this.page++;
     })
  }
}
