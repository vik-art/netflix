import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/common/interfaces/movie.interface';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-selected',
  templateUrl: './selected.component.html',
  styleUrls: ['./selected.component.scss']
})
export class SelectedComponent implements OnInit {

  constructor(
    private dataBase: DatabaseService
  ) { }

  movies!: Array<Movie>;
  user = localStorage.getItem('id');

  ngOnInit(): void {
    this.initSelectedMovies();
  }

  initSelectedMovies() {
    
    this.dataBase.getUserMovies(this.user!, "selected")
      .subscribe((res) => {
        if (res) {
          this.movies = res;
        } 
    })
  }

}
