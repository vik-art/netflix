import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from 'src/app/common/interfaces/movie.interface';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  @Input() movies!: Movie[];
  @Output() openMoviePage = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  openModal(id: number) {
  this.openMoviePage.emit(id)
}
}
