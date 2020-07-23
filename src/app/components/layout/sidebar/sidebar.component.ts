import { Component, OnInit } from '@angular/core';
import 'metismenu';
import {Router} from '@angular/router';
import {User} from '../../../entities/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public ariaExpanded =  {
    items: false,
    departments: false
  };
  public isAuthenticated = false;
  public miniNavBar: boolean;
  private user: User;

  constructor(private router: Router) { }

  ngOnInit() {
    this.isAuthenticated = Boolean(localStorage.getItem('isAuthenticated'));
    this.user = JSON.parse(localStorage.getItem('User') );
    setTimeout(() => $('#side-menu').metisMenu(), 0);
  }

  changeAriaExpanded(type: string) {
    switch (type) {
      case 'items':
        this.ariaExpanded.items = !this.ariaExpanded.items;
        this.ariaExpanded.departments = false;
        break;
      case 'departments':
        this.ariaExpanded.departments = !this.ariaExpanded.departments;
        this.ariaExpanded.items = false;
        break;
      default: for (let value of Object.values(this.ariaExpanded) ) {
        value = false;
      }
    }
  }

  collapseNavBar() {
    this.miniNavBar = !this.miniNavBar;
  }

  logout() {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
    localStorage.removeItem('User');
    this.router.navigate([ '/login']).then();
  }

}
