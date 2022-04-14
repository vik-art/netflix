import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
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
  selectedBtnText = "Mark as selected"
  deleteBtnText = "Delete from favourite"
  

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
        const arr = Object.values(res!);
        arr ? this.movies = arr :  this.noResults = true;
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
  onDelete(e: Movie) {
    this.dataBase.getUserMovies(this.user!, "favourite").subscribe((res) => {
      const arr = Object.entries(res!);
      arr.map((el) => {
        if(el[1].id === e.id){
        this.dataBase.deleteData(el[0], this.user!, "favourite").subscribe(() => {
          this.onClose();
          this.initFavouritePage();
        })
        }
      })
    })

    }
  }

