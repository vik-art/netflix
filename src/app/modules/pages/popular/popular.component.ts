import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/common/interfaces/movie.interface';
import { DatabaseService } from 'src/app/services/database.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss']
})
export class PopularComponent implements OnInit {

  page: number = 1;
  movies!: Movie[];
  showModal: boolean = false;
  movie!: Movie;

  constructor(
    private movieService: MovieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initPopularMovies()
  }

  initPopularMovies() {
    this.movieService.getPopularMovies(this.page).subscribe((movies) => {
      this.movies = movies.results as Array<Movie>
  })
  }
  
  openMoviePage(event: number) {
    this.movieService.getById(event).subscribe((movie: Movie) => {
      this.showModal = true;
      this.movie = movie;
      this.router.navigate(["/popular"], {queryParams: {movie: event}})
   })
  }

  onClose() {
    this.showModal = false;
    this.router.navigate(["/popular"])
  }
}
