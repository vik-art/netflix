import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/common/interfaces/movie.interface';
import { DatabaseService } from 'src/app/services/database.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {

  movies!: Movie[];
  user = localStorage.getItem("id");
  showModal: boolean = false;
  movie!: Movie;
  public load: boolean = false;
  noResults: boolean = false;

  constructor(
    private dataBase: DatabaseService,
    private movieService: MovieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initFavouritePage()
  }

  initFavouritePage() {
    this.dataBase.getUserMovies(this.user!, "favourite")
      .subscribe((res) => {
        if (res) {
          this.movies = res;
        } else {
          this.noResults = true;
      }
    })
  }

  openModal(event: number) {
    this.movieService.getById(event).subscribe((movie: Movie) => {
      this.showLoading();
      this.showModal = true;
      this.movie = movie;
      this.router.navigate(["/favourite"], {queryParams: {movie: event}})
    })
  }
  onClose() {
    this.showModal = false;
    this.router.navigate(["/favourite"])
  }
   showLoading() {
    this.load = true;

    setTimeout(() => {
      this.load = false
    }, 3000)
  }
}
