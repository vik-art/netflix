import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/common/interfaces/movie.interface';
import { DatabaseService } from 'src/app/services/database.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-selected',
  templateUrl: './selected.component.html',
  styleUrls: ['./selected.component.scss']
})
export class SelectedComponent implements OnInit, OnDestroy {

  constructor(
    private dataBase: DatabaseService,
    private movieService: MovieService,
    private router: Router
  ) { }

  movies!: Array<Movie>;
  user = localStorage.getItem('id');
  showModal: boolean = false;
  movie!: Movie;
  noResults: boolean = false;

  public load: boolean = false;

  unSubscriber = new Subscription();

  ngOnInit(): void {
    this.initSelectedMovies();
  }

   ngOnDestroy(): void {
     this.unSubscriber.unsubscribe();
   }
  
  initSelectedMovies() {
    this.unSubscriber.add(
      this.dataBase.getUserMovies(this.user!, "selected")
      .subscribe((res) => {
        res ? this.movies = res : this.noResults = true;
        }))
  }

  openModalWindow(event: number) {
    this.unSubscriber.add(
    this.movieService.getById(event).subscribe((movie: Movie) => {
      this.showLoading();
      this.showModal = true;
      this.movie = movie;
         this.router.navigate(['/selected'], {queryParams: {movie: event}})
    }))
  }
  
  onClose() {
    this.showModal = false;
    this.router.navigate(['/selected'])
  }
   showLoading() {
    this.load = true;

    setTimeout(() => {
      this.load = false
    }, 3000)
  }
}
