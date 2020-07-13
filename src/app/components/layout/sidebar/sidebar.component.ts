import { Component, OnInit } from '@angular/core';
import 'metismenu';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public ariaExpanded =  {
    categories: false
  };
  public isAuthenticated = false;
  public miniNavBar: boolean;

  constructor(private router: Router) { }

  ngOnInit() {
    this.isAuthenticated = Boolean(localStorage.getItem('isAuthenticated'));
    setTimeout(() => $('#side-menu').metisMenu(), 0);
  }

  changeAriaExpanded(type: string) {
    switch (type) {
      case 'categories':
        this.ariaExpanded.categories = !this.ariaExpanded.categories;
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