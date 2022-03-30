import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from 'src/app/common/interfaces/movie.interface';
import { AlertService } from 'src/app/services/alert.service';
import { DatabaseService } from 'src/app/services/database.service';


@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss']
})
export class MoviePageComponent {
  @Input() item!: Movie;
  @Output() closeWindow = new EventEmitter();
  userId: string | null = localStorage.getItem('id');
  favouriteBtnText: string = "Favourite";
  selectedBtnText: string = "Selected"

  constructor(
    private dbService: DatabaseService,
    private alertService: AlertService
  ) { }


  addToFavourite(movie: Movie) {
    this.dbService.getMovies(this.userId!, 'favourite').subscribe((response) => {
      if (!response) {
        this.addItem(movie, 'favourite');
        this.favouriteBtnText = "Marked as favourite";
        this.alertService.success("You have marked this film as favourite")
      } else {
        const unique = response.filter((el: number) => el === movie.id)
        if (unique.length === 0) {
          this.favouriteBtnText = "Marked as favourite";
          this.alertService.success("You have marked this film as favourite")
          return this.addItem(movie, 'favourite');
          
        } else {
          this.alertService.danger("You have already marked this film as favourite before")
          return null;
        }
      }
    })
  }

  addToLiked(movie: Movie) {
    this.dbService.getMovies(this.userId!, 'selected').subscribe((response) => {
      if (!response) {
        this.addItem(movie, 'selected');
        this.alertService.success("You have marked this film as selected")
        this.selectedBtnText = "Marked as selected"
      } else {
        const unique = response.filter((el: number) => el === movie.id)
        if (unique.length === 0) {
          this.selectedBtnText = "Marked as selected"
          this.alertService.success("You have marked this film as selected")
          return this.addItem(movie, 'selected')
        } else {
          this.alertService.danger("You have already marked this film as selected before")
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
   this.closeWindow.emit()
  }
}

