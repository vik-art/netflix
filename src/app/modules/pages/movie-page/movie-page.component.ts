import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/common/interfaces/movie.interface';
import { DatabaseService } from 'src/app/services/database.service';

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
    this.dbService.getMovies(this.userId!, 'favourite').subscribe((response) => {
      if (!response) {
        this.addItem(movie, 'favourite')
      } else {
        const unique = response.filter((el: number) => el === movie.id)
        if (unique.length === 0) {
          return this.addItem(movie, 'favourite')
        } else {
          return null;
        }
      }
    })
  }

  addToLiked(movie: Movie) {
    this.dbService.getMovies(this.userId!, 'selected').subscribe((response) => {
      if (!response) {
        this.addItem(movie, 'selected')
      } else {
        const unique = response.filter((el: number) => el === movie.id)
        if (unique.length === 0) {
          return this.addItem(movie, 'selected')
        } else {
          return null;
        }
      }
    })
  }

  addItem(movie: Movie, type: string) {
    this.dbService.updateData(movie, this.userId!, type).subscribe(() => {
    })
  }

  onCloseInfo() {

  }
}

