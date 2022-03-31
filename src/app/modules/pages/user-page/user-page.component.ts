import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/common/interfaces/movie.interface';
import { AlertService } from 'src/app/services/alert.service';
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
  movieSub!: Subscription;
  moreSub!: Subscription;
  openPage: boolean = false;

  public load: boolean = false;

  constructor(
    private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.router.navigate(['/user'])
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
    this.movieSub = this.movieService.getMovie(queryParams)
      .subscribe((movies) => {
        if (movies.results?.length) {
          this.showLoading();
          this.movies = movies.results as Array<Movie>;
          this.router.navigate(['/user'], { queryParams: { query: this.searchQuery } });
          this.page++;
        } else {
          this.alertService.danger("There are no results on your search query");
          this.form.reset()
        }
      })
  }
  loadMoreMovies() {
    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['query'];
    })
    const queryParams = {
     searchQuery: this.searchQuery,
     page: this.page
    }
    this.moreSub = this.movieService.getMovie(queryParams)
      .subscribe((movies) => {
       this.showLoading();
        this.movies = [...this.movies, ...movies.results as Array<Movie>];
       this.page++;
     })
  }

  openMoviePage(event: number) {
    return this.movieService.getById(event)
      .subscribe((movie: Movie) => {
        this.showLoading();
        this.openPage = true;
         this.movie = movie;
         this.router.navigate(['/user'], {queryParams: {query: this.searchQuery, movie: event}})
       })    
  }

  onClose() {
    this.openPage = false;
    this.router.navigate(['/user'], { queryParams: { query: this.searchQuery } })
  }

  showLoading() {
    this.load = true;

    setTimeout(() => {
      this.load = false
    }, 3000)
  }

 
}
