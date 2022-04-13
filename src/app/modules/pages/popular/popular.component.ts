import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MOVIE_MENU_LIST } from 'src/app/common/constants/movie-menu-list';
import { MovieMenu } from 'src/app/common/interfaces/menu.interface';
import { Movie } from 'src/app/common/interfaces/movie.interface';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss']
})
export class PopularComponent implements OnInit, OnDestroy {

  page: number = 1;
  movies!: Movie[];
  showModal: boolean = false;
  movie!: Movie;
  showMovie: boolean = false;
  favouriteBtnText = "Add to favourite";
  selectedBtnText = "Mark as selected"

  public activeItem!: string;
  public load: boolean = false;

  movieMenuList: Array<MovieMenu> = MOVIE_MENU_LIST;

  unSubscriber = new Subscription();

  constructor(
    private movieService: MovieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.openMovies("/popular", "Popular")
  }

   ngOnDestroy(): void {
     this.unSubscriber.unsubscribe();
  }

  openMovies(type: string, item: string) {
   this.unSubscriber.add(this.movieService.getPopularMovies(type).subscribe((movies) => {
      this.movies = movies.results as Array<Movie>;
      this.showMovie = true;
      this.onSelectItem(item);
  }))
  }

 public onSelectItem(item: string): void {
    this.activeItem = item;
  }
  
  openMoviePage(event: number) {
  this.unSubscriber.add(this.movieService.getById(event).subscribe((movie: Movie) => {
      this.showLoading();
      this.showModal = true;
      this.movie = movie;
      this.router.navigate(["/movies"], {queryParams: {movie: event}})
   }))
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
