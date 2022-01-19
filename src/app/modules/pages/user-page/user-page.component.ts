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
  searchQuery!: string;
  page: number = 1;
  movies: Array<Movie> = [];

  constructor(
    private movie: MovieService
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.form = new FormGroup({
      query: new FormControl('', Validators.required)
    })
    this.form.valueChanges.subscribe(() => {
      if (this.searchQuery !== this.form.value.query) {
      this.movies = [];
    }
      this.searchQuery = this.form.value.query;
    })
  }
  submit() {
   this.movie.getMovie( this.searchQuery, this.page)
     .subscribe((movies) => {
       if (this.movies) {
          this.movies = [...this.movies, ...movies.results as Array<Movie>];
        } else {
          this.movies = movies.results as Array<Movie>;
        }
       this.page++;
     })
  }
}
