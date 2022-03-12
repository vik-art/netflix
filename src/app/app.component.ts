import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    setTimeout(() => {
      this.name = "New name"
    }, 3000)
  }

  name = "Some Name"
  title = 'netflix-clone';
}
