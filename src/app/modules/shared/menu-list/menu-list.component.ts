import { Component, OnInit, Input } from '@angular/core';
import { ImenuItem } from 'src/app/common/interfaces/menu.interface';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {
  @Input() menuList!:Array<ImenuItem>;

  constructor() { }

  ngOnInit(): void {
  }

}
