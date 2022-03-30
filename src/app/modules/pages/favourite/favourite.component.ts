import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/common/interfaces/movie.interface';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {

  movies!: Movie[];
  user = localStorage.getItem("id");

  constructor(
    private dataBase: DatabaseService
  ) { }

  ngOnInit(): void {
    this.initFavouritePage()
  }

  initFavouritePage() {
    this.dataBase.getUserMovies(this.user!, "favourite")
      .subscribe((res) => {
        if (res) {
          this.movies = res;
      }
    })
  }

}
