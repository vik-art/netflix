import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
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
  @Input() favouriteBtnText!: string;
  @Input() selectedBtnText!: string;
  @Input() deleteBtnText!: string;
  @Input() showDeleteBtn!: boolean;
  @Input() showFavouriteBtn!: boolean;
  @Input() showSelectedBtn!: boolean;

  @Output() closeWindow = new EventEmitter();
  @Output() deleteItem = new EventEmitter();

  userId: string | null = localStorage.getItem('id');
  unSubscriber = new Subscription();

  constructor(
    private dbService: DatabaseService,
    private alertService: AlertService
  ) { }


  addToFavourite(movie: Movie) {
    this.addMovie(movie, "favourite")
    this.favouriteBtnText = "Added to favourite";
  }

  addToSelected(movie: Movie) {
    this.addMovie(movie, "selected");
    this.selectedBtnText = "Added ot selected";
  }

  addItem(movie: Movie, type: string) {
   this.unSubscriber.add(this.dbService.updateData(movie, this.userId!, type).subscribe(() => {
    }))
  }

  addMovie(movie: Movie, type: string) {
   this.unSubscriber.add(this.dbService.getMovies(this.userId!, type).subscribe((response) => {
      if (!response) {
        this.addItem(movie, type);
        this.alertService.success(`You have marked this film as ${type}`);
      } else {
        const unique = response.filter((el: number) => el === movie.id)
        if (unique.length === 0) {
          this.alertService.success(`You have marked this film as ${type}`)
          return this.addItem(movie, type)
        } else {
          this.alertService.danger(`You have already marked this film as ${type} before`)
          return null;
        }
      }
    }))
  }

  onCloseInfo() {
   this.closeWindow.emit()
  }

  deleteMovie(item: Movie) {
    this.deleteItem.emit(item)
  }
}

