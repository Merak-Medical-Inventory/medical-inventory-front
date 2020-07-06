import { Component, OnInit } from '@angular/core';
import 'metismenu';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public isAuthenticated = false;
  public miniNavBar: boolean;

  constructor(private router: Router) { }

  ngOnInit() {
    this.isAuthenticated = Boolean(localStorage.getItem('isAuthenticated'));
    setTimeout(() => $('#side-menu').metisMenu(), 0);
  }

  collapseNavBar() {
    this.miniNavBar = !this.miniNavBar;
  }

  logout() {
    localStorage.removeItem('isAuthenticated');
    this.router.navigate([ '/login']).then();
  }

}
