import { Component, OnInit } from '@angular/core';
import {Order, OrderToItem, UpdateOrder} from '../../../entities/order';
import {OrderService} from '../../../services/order/order.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {AlertService} from '../../../services/alert/alert.service';
import { LotService } from '../../../services/lot/lot.service';
import { Item } from 'src/app/entities/item';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { LotFormComponent } from '../lot-form/lot-form.component';
import {ItemLot, PostLot} from '../../../entities/lot';
import {ItemListComponent} from '../../items/item-list/item-list.component';
import {filterTable, paginateObject} from '../../../util';
import {Provider} from '../../../entities/provider';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  currentPageOrder: Order[];
  paginatedOrder: Order[][] = [];
  search = '';
  isLoading = true;
  pageSize = 1;
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

  constructor(private service: OrderService, private modalService: NgbModal,
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
        this.paginatedOrder = paginateObject<Order>(this.orders, this.pageSize);
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
    this.paginatedOrder = paginateObject<Order>(filterTable<Order>(this.orders, this.search), this.pageSize);
    this.currentPageOrder = this.paginatedOrder[0];
  }
  showItems(orderItems: OrderToItem[]) {
    const modalRef: NgbModalRef = this.modalService.open(ItemListComponent, { centered: true } );
    modalRef.componentInstance.orderItems = orderItems;
    modalRef.componentInstance.isClient = true;
  }

  showItem(orderItem: OrderToItem): string {
    let itemDisplay = '';
    const item: Item = orderItem.item;
    itemDisplay = itemDisplay + orderItem.amount + ' unidades de ' +
        item.generalItem.name + ' ' +  item.brand.name + ' '
        + item.presentation.quantity + ' ' + item.presentation.name + ' '
        + item.presentation.measure_value + ' ' + item.presentation.measure;
    return itemDisplay;
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  addLot(id: number, orderItems: OrderToItem[]) {
    this.alertService.clear();
    Swal.fire({
      title: 'Desea Aprobar el Pedido?',
      // text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.value) {
        this.isLoading = true;
        const postItemsLot: ItemLot[] = [];
        orderItems.forEach(async (item) => {
          const modalRef: NgbModalRef = this.modalService.open(LotFormComponent, { centered: true } );
          modalRef.componentInstance.item = this.showItem(item);
          modalRef.componentInstance.isClient = true;
          await modalRef.result.then((date) => {
            console.log(date);
            const itemLot: any = {
              id: item.item.id,
              amount: item.amount
            };
            if (date !== '') {
              itemLot.dueDate = date;
            }
            postItemsLot.push(itemLot);
            console.log(postItemsLot);
            if (postItemsLot.length == orderItems.length) {
              this.approveOrder(id, postItemsLot);
            }
          });
        });
      }
    });
  }

  async approveOrder(id: number, postItemsLot: ItemLot[]) {
    const update: UpdateOrder = {
      status: 'aprobado'
    };
    const postLot: PostLot = {
      order: id,
      items: postItemsLot
    };
    this.lotService.postLot(postLot).subscribe(response => {
      this.service.updateOrder(update, id)
      .subscribe(response => {
        this.isLoading = false;
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'El Pedido se ha Aprobado',
          showConfirmButton: false,
          timer: 1500
        });
        this.reloadCurrentRoute();
      }, error => {
        this.isLoading = false;
        console.log(error);
        this.alertService.error('Error al Aprobar el Pedido', false);
      });
    }, error => {
      this.isLoading = false;
      console.log(error);
      this.alertService.error('Error al Registrar los Lotes', false);
    });
  }
}
