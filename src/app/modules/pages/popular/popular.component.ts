import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MOVIE_MENU_LIST } from 'src/app/common/constants/movie-menu-list';
import { MovieMenu } from 'src/app/common/interfaces/menu.interface';
import { Movie } from 'src/app/common/interfaces/movie.interface';
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
  showMovie: boolean = false;

  public activeItem!: string;
    public load: boolean = false;

  movieMenuList: Array<MovieMenu> = MOVIE_MENU_LIST;

  constructor(
    private movieService: MovieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.openMovies("/popular", "Popular")
  }

  openMovies(type: string, item: string) {
    this.movieService.getPopularMovies(type).subscribe((movies) => {
      this.movies = movies.results as Array<Movie>;
      this.showMovie = true;
      this.onSelectItem(item);
  })
  }

 public onSelectItem(item: string): void {
    this.activeItem = item;
  }
  
  openMoviePage(event: number) {
    this.movieService.getById(event).subscribe((movie: Movie) => {
      this.showLoading();
      this.showModal = true;
      this.movie = movie;
      this.router.navigate(["/movies"], {queryParams: {movie: event}})
   })
  }

  onClose() {
    this.showModal = false;
    this.router.navigate(["/movies"])
  }

   showLoading() {
    this.load = true;

    setTimeout(() => {
      this.load = false
    }, 3000)
  }
}
