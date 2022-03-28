import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/common/interfaces/movie.interface';
import { DatabaseService } from 'src/app/services/database.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss']
})
export class MoviePageComponent {
  @Input() item!: Movie;
  marked: boolean = false;
  userId: string | null = localStorage.getItem('id')

  constructor(
    private dbService: DatabaseService,
  ) { }


  addToFavourite(movie: Movie) {
    this.marked = true;
    this.dbService.updateData(movie, this.userId!, 'favourite').subscribe(() => {
    })
  }

  addToLiked(movie: Movie) {
    this.marked = true;
this.dbService.updateData(movie, this.userId!, 'liked').subscribe(() => {})
  }
}

