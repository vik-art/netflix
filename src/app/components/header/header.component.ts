import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HEADER_MENU_LIST } from 'src/app/common/constants/header-menu-list';
import { ImenuItem } from 'src/app/common/interfaces/menu.interface';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  menuListItems: Array<ImenuItem> = HEADER_MENU_LIST;
  mobileMenu: boolean = false;
  closeMenu: boolean = false;

  constructor(
    public auth: AuthService,
    private route: Router,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
  }

  logOut(event: Event) {
    event.preventDefault()
    this.auth.logout();
    this.alert.success('You have logged out!')
    this.route.navigate(['/'])
  }


  toggleMenu() {
    this.mobileMenu = !this.mobileMenu;
    this.closeMenu = !this.closeMenu;
  }
  onRegister() {
    this.route.navigate(["/register"]);
    this.mobileMenu = false;
    this.closeMenu = false;
  }
  onLogin() {
    this.route.navigate(["/login"]);
    this.mobileMenu = false;
    this.closeMenu = false;
  }
}


