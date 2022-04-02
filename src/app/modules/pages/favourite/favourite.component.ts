import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Movie } from 'src/app/common/interfaces/movie.interface';
import { DatabaseService } from 'src/app/services/database.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit, OnDestroy {

  movies!: Movie[];
  user = localStorage.getItem("id");
  showModal: boolean = false;
  movie!: Movie;
  public load: boolean = false;
  noResults: boolean = false;
  unSubscriber = new Subscription();
  

  constructor(
    private dataBase: DatabaseService,
    private movieService: MovieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initFavouritePage()
  }

  ngOnDestroy(): void {
    this.unSubscriber.unsubscribe();
  }

  initFavouritePage() {
  this.unSubscriber.add(this.dataBase.getUserMovies(this.user!, "favourite")
      .subscribe((res) => {
        res ? this.movies = res :  this.noResults = true;
      }))
  }

  openModal(event: number) {
  this.unSubscriber.add(this.movieService.getById(event).subscribe((movie: Movie) => {
      this.showLoading();
      this.showModal = true;
      this.movie = movie;
      this.router.navigate(["/favourite"], {queryParams: {movie: event}})
    }))
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
