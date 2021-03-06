import { Component, OnInit } from '@angular/core';
import 'metismenu';
import {Router} from '@angular/router';
import {User} from '../../../entities/user';
import {Rol} from '../../../entities/rol';
import { roles} from 'src/app/constants/rolConstants';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  roles = roles;

  public ariaExpanded =  {
    items: false,
    orders: false,
    departments: false,
    users: false,
    inventory: false,
    orderDepartment: false
  };
  public isAuthenticated = false;
  public miniNavBar: boolean;
  user: User;
  rol: Rol;

  constructor(private router: Router) { }

  ngOnInit() {
    this.isAuthenticated = Boolean(localStorage.getItem('isAuthenticated'));
    this.user = JSON.parse(localStorage.getItem('User') );
    this.rol = this.user.rol;
    setTimeout(() => $('#side-menu').metisMenu(), 0);
  }

  changeAriaExpanded(type: string) {
    switch (type) {
      case 'items':
        this.ariaExpanded.items = !this.ariaExpanded.items;
        this.ariaExpanded.departments = false;
        this.ariaExpanded.users = false;
        this.ariaExpanded.orders = false;
        this.ariaExpanded.inventory = false;
        this.ariaExpanded.orderDepartment = false;
        break;
      case 'orders':
        this.ariaExpanded.orders = !this.ariaExpanded.orders,
        this.ariaExpanded.items = false;
        this.ariaExpanded.departments = false;
        this.ariaExpanded.users = false;
        this.ariaExpanded.inventory = false;
        this.ariaExpanded.orderDepartment = false;
        break;
      case 'departments':
        this.ariaExpanded.departments = !this.ariaExpanded.departments;
        this.ariaExpanded.items = false;
        this.ariaExpanded.users = false;
        this.ariaExpanded.orders = false;
        this.ariaExpanded.inventory = false;
        this.ariaExpanded.orderDepartment = false;
        break;
      case 'users':
        this.ariaExpanded.users = !this.ariaExpanded.users;
        this.ariaExpanded.items = false;
        this.ariaExpanded.departments = false;
        this.ariaExpanded.orders = false;
        this.ariaExpanded.inventory = false;
        this.ariaExpanded.orderDepartment = false;
        break;
      case 'inventory':
        this.ariaExpanded.inventory = !this.ariaExpanded.inventory;
        this.ariaExpanded.items = false;
        this.ariaExpanded.departments = false;
        this.ariaExpanded.orders = false;
        this.ariaExpanded.users = false;
        this.ariaExpanded.orderDepartment = false;
        break;
      case 'orderDepartment':
        this.ariaExpanded.orderDepartment = !this.ariaExpanded.orderDepartment;
        this.ariaExpanded.inventory = false;
        this.ariaExpanded.items = false;
        this.ariaExpanded.departments = false;
        this.ariaExpanded.orders = false;
        this.ariaExpanded.users = false;
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
