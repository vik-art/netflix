import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HEADER_MENU_LIST } from 'src/app/common/constants/header-menu-list';
import { ImenuItem } from 'src/app/common/interfaces/menu.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  menuListItems:Array<ImenuItem> = HEADER_MENU_LIST;

  constructor(
    public auth: AuthService,
    private route: Router
  ) { }

  ngOnInit(): void {
  }
  logOut() {
    this.auth.logout();
    this.route.navigate(['/'])
  }

}
