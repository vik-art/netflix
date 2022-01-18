import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Movie } from 'src/app/common/interfaces/movie.interface';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private movie: MovieService
  ) { }

  page!: number;
  movies: Array<Movie> = [];

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.form = new FormGroup({
      query: new FormControl('', Validators.required)
    })
    this.form.valueChanges.subscribe(() => {})
  }
  submit() {
    this.movie.getMovie(this.form.value.query)
      .subscribe((movies) => {
        this.movies = movies.results;
        this.page = movies.page;
        console.log(this.movies, this.page)
    })
  }
  loadMoreMovies() {
    
  }
}
