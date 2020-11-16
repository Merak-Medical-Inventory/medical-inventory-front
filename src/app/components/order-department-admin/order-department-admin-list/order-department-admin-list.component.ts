import { Component, OnInit } from '@angular/core';
import {OrderToItem} from '../../../entities/order';
import {DeniedOrderDepartment, OrderDepartment, OrderDepartmentAdminTable} from '../../../entities/orderDepartment';
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
  selector: 'app-order-department-admin-list',
  templateUrl: './order-department-admin-list.component.html',
  styleUrls: ['./order-department-admin-list.component.css']
})
export class OrderDepartmentAdminListComponent implements OnInit {

  orders: OrderDepartment[] = [];
  ordersTable: OrderDepartmentAdminTable[] = [];
  currentPageOrder: OrderDepartmentAdminTable[];
  paginatedOrder: OrderDepartmentAdminTable[][] = [];
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
    this.service.getOrders()
      .subscribe(response => {
        this.isLoading = false;
        this.orders = response.body['data'];
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
            dateRes = null;
          }
          const element: OrderDepartmentAdminTable = {
            id: item.id,
            status: item.status,
            date: item.date,
            department: item.department.name,
            dateResponse: item.dateResponse,
            transmitter: item.transmitter.email,
            sender: send,
            orderToItem: item.OrderDepartmentToItem,
          };
          return element;
        });
        this.paginatedOrder = paginateObject<OrderDepartmentAdminTable>(this.ordersTable, this.pageSize);
        this.currentPageOrder = this.paginatedOrder[0];
        console.log(this.orders);
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
    this.paginatedOrder = paginateObject<OrderDepartmentAdminTable>(filterTable<OrderDepartmentAdminTable>(this.ordersTable, this.search)
      , this.pageSize);
    this.currentPageOrder = this.paginatedOrder[0];
  }
  showItems(orderItems: OrderToItem[]) {
    console.log(orderItems);
    const modalRef: NgbModalRef = this.modalService.open(ItemListComponent, { centered: true } );
    modalRef.componentInstance.orderItems = orderItems;
    modalRef.componentInstance.isClient = true;
  }

  async deniedOrder(id: number) {
    const { value: message } = await Swal.fire({
      input: 'textarea',
      inputPlaceholder: 'Inserte el Mensaje de Respuesta al Pedido Negado...',
      inputAttributes: {
        'aria-label': 'Inserte el Mensaje'
      },
      showCancelButton: true
    });
    if (message) {
      this.isLoading = true;
      this.user = JSON.parse(localStorage.getItem('User') );
      const body: DeniedOrderDepartment = {
        status: 'Negado',
        sender: this.user.id,
        response : String(message),
        dateResponse: new Date()
      };
      this.service.deniedOrderDepartment(body, id).subscribe(response => {
        this.isLoading = false;
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'El Pedido se ha Negado',
          showConfirmButton: false,
          timer: 1500
        });
        this.reloadCurrentRoute();
      }, error => {
        this.isLoading = false;
        console.log(error);
        this.alertService.error('Error al Negar el Pedido', false);
      });
    }
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

}
