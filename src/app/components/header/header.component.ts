import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';

import { HEADER_MENU_LIST } from 'src/app/common/constants/header-menu-list';
import { ImenuItem } from 'src/app/common/interfaces/menu.interface';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger("showMenu", [
      state('show', style({
        opacity: 1
      })),
      state('hide', style({
        opacity: 0
      })),
      transition("show => hide", animate('600ms ease-out')),
      transition("hide => show", animate('1000ms ease-out'))
    ])
  ]
})
export class HeaderComponent implements OnInit {
  
  menuListItems: Array<ImenuItem> = HEADER_MENU_LIST;
  mobileMenu: boolean = false;
  closeMenu: boolean = false;
  show = true;

  constructor(
    public auth: AuthService,
    private route: Router,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
  }

  get stateName() {
    return this.show ? "show" : "hide";
  }
  toggle() {
    this.show = !this.show;
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
    this.toggle();
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


