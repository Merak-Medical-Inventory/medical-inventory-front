import { Component, OnInit } from '@angular/core';
import {OrderToItem} from '../../../entities/order';
import {OrderDepartment, OrderDepartmentTable, OrdersByDepartment} from '../../../entities/orderDepartment';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {AlertService} from '../../../services/alert/alert.service';
import { LotService } from '../../../services/lot/lot.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ItemListComponent} from '../../items/item-list/item-list.component';
import {filterTable, paginateObject} from '../../../util';
import {PageEvent} from '@angular/material';
import {User} from '../../../entities/user';
import {OrderDepartmentService} from '../../../services/orderDepartment/order-department.service';

@Component({
  selector: 'app-order-department-list',
  templateUrl: './order-department-list.component.html',
  styleUrls: ['./order-department-list.component.css']
})
export class OrderDepartmentListComponent implements OnInit {
  ordersByDepartment: OrdersByDepartment;
  orders: OrderDepartment[] = [];
  ordersTable: OrderDepartmentTable[] = [];
  currentPageOrder: OrderDepartmentTable[];
  paginatedOrder: OrderDepartmentTable[][] = [];
  user: User;
  search = '';
  isLoading = true;
  pageSize = 10;
  months = {
    0: 'Enero',
    1: 'Febrero',
    2: 'Marzo',
    3: 'Abril',
    4: 'Mayo',
    5: 'Junio',
    6: 'Julio',
    7: 'Agosto',
    8: 'Septiembre',
    9: 'Octubre',
    10: 'Noviembre',
    11: 'Diciembre',
  };

  constructor(private service: OrderDepartmentService, private modalService: NgbModal,
              private router: Router, private lotService: LotService, private alertService: AlertService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('User') )
    this.service.getOrderDepartment(this.user.department.id)
      .subscribe(response => {
        this.ordersByDepartment = response.body['data'];
        this.orders = this.ordersByDepartment.orderDepartment;
        this.orders = this.orders.map(value => {
          const date = new Date(value.date);
          // @ts-ignore
          value.date = `${date.getDate()} de ${this.months[date.getMonth()]} de ${date.getFullYear()}`;
          return value;
        });
        let send: string;
        let dateRes: Date;
        this.ordersTable = this.orders.map(item => {
          if (item.sender) {
            send = item.sender.email;
          } else {
            send = '';
          }
          if (item.dateResponse) {
            const date = new Date(item.dateResponse);
            // @ts-ignore
            dateRes = `${date.getDate()} de ${this.months[date.getMonth()]} de ${date.getFullYear()}`;
          } else {
            // @ts-ignore
            dateRes = '';
          }
          const element: OrderDepartmentTable = {
            id: item.id,
            status: item.status,
            date: item.date,
            dateResponse: item.dateResponse,
            transmitter: item.transmitter.email,
            sender: send,
            orderToItem: item.OrderDepartmentToItem,
          };
          return element;
        });
        this.paginatedOrder = paginateObject<OrderDepartmentTable>(this.ordersTable, this.pageSize);
        this.currentPageOrder = this.paginatedOrder[0];
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
        console.log(error.error);
        this.alertService.error('Error al Obtener los Pedidos', false);
      });
  }
  onPageChanged(event: PageEvent) {
    this.currentPageOrder = this.paginatedOrder[event.pageIndex];
  }

  searchTyped() {
    this.paginatedOrder = paginateObject<OrderDepartmentTable>(filterTable<OrderDepartmentTable>(this.ordersTable, this.search)
      , this.pageSize);
    this.currentPageOrder = this.paginatedOrder[0];
  }
  showItems(orderItems: OrderToItem[]) {
    const modalRef: NgbModalRef = this.modalService.open(ItemListComponent, { centered: true,size: 'xl' } );
    modalRef.componentInstance.orderItems = orderItems;
    modalRef.componentInstance.isClient = true;
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
