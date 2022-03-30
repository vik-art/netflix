import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/common/interfaces/movie.interface';
import { DatabaseService } from 'src/app/services/database.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-selected',
  templateUrl: './selected.component.html',
  styleUrls: ['./selected.component.scss']
})
export class SelectedComponent implements OnInit {

  constructor(
    private dataBase: DatabaseService,
    private movieService: MovieService,
    private router: Router
  ) { }

  movies!: Array<Movie>;
  user = localStorage.getItem('id');
  showModal: boolean = false;
  movie!: Movie;

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

  openModalWindow(event: number) {
    this.movieService.getById(event).subscribe((movie: Movie) => {
      this.showModal = true;
      this.movie = movie;
         this.router.navigate(['/selected'], {queryParams: {movie: event}})
    })
  }
  
  onClose() {
    this.showModal = false;
    this.router.navigate(['/selected'])
  }
}
