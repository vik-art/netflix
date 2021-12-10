import { Component, OnInit } from '@angular/core';
import { HEADER_MENU_LIST } from 'src/app/common/constants/header-menu-list';
import { ImenuItem } from 'src/app/common/interfaces/menu.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuListItems:Array<ImenuItem> = HEADER_MENU_LIST;

  constructor() { }

  ngOnInit(): void {
  }

}
