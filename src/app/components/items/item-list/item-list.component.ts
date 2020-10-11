import { Component, OnInit, Input } from '@angular/core';
import {Item, ItemTable} from '../../../entities/item';
import {ItemService} from '../../../services/item/item.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {AlertService} from '../../../services/alert/alert.service';
import {OrderToItem, OrderToItemTable} from '../../../entities/order';
import {filterTable, paginateObject} from '../../../util';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  @Input() providerItems: Item[];
  items: Item[] = [];
  itemsTable: ItemTable[] = [];
  currentPageItem: ItemTable[];
  paginatedItems: ItemTable[][] = [];
  @Input() orderItems: OrderToItem[];
  orderItemsTable: OrderToItemTable[] = [];
  currentPageOrderItem: OrderToItemTable[];
  paginatedOrderItems: OrderToItemTable[][] = [];
  search = '';
  isLoading = true;
  pageSize = 10;

  constructor(private service: ItemService, private router: Router, private alertService: AlertService) { }

  ngOnInit() {
    if (this.providerItems) {
      this.items = this.providerItems;
      this.itemsTable = this.items.map(item => {
        const element: ItemTable = {
          id: item.id,
          code: item.code,
          brand_code: item.brand_code,
          generalItem: item.generalItem.name,
          category: item.category.name,
          brand: item.brand.name,
          presentation: item.presentation.quantity + ' ' + item.presentation.name + ' ' +
            item.presentation.measure_value + ' ' + item.presentation.measure,
        };
        return element;
      });
      this.paginatedItems = paginateObject<ItemTable>(this.itemsTable, this.pageSize);
      this.currentPageItem = this.paginatedItems[0];
      this.isLoading = false;
    } else
    if (this.orderItems) {
      this.orderItemsTable = this.orderItems.map(item => {
        const element: OrderToItemTable = {
          amount: item.amount,
          code: item.item.code,
          brand_code: item.item.brand_code,
          generalItem: item.item.generalItem.name,
          category: item.item.category.name,
          brand: item.item.brand.name,
          presentation: item.item.presentation.quantity + ' ' + item.item.presentation.name + ' ' +
            item.item.presentation.measure_value + ' ' + item.item.presentation.measure,
        };
        return element;
      });
      this.paginatedOrderItems = paginateObject<OrderToItemTable>(this.orderItemsTable, this.pageSize);
      this.currentPageOrderItem = this.paginatedOrderItems[0];
      this.isLoading = false;
    } else {
      this.service.getItems()
        .subscribe(response => {
          this.items = response.body['data'];
          this.itemsTable = this.items.map(item => {
            const element: ItemTable = {
              id: item.id,
              code: item.code,
              brand_code: item.brand_code,
              generalItem: item.generalItem.name,
              category: item.category.name,
              brand: item.brand.name,
              presentation: item.presentation.quantity + ' ' + item.presentation.name + ' ' +
              item.presentation.measure_value + ' ' + item.presentation.measure,
            };
            return element;
          });
          this.paginatedItems = paginateObject<ItemTable>(this.itemsTable, this.pageSize);
          this.currentPageItem = this.paginatedItems[0];
          this.isLoading = false;
        }, error => {
          this.isLoading = false;
          console.log(error.error);
          this.alertService.error('Error al Obtener los Insumos', false);
        });
    }
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  onPageItemChanged(event: PageEvent) {
    this.currentPageItem = this.paginatedItems[event.pageIndex];
  }

  onPageOrderItemChanged(event: PageEvent) {
    this.currentPageOrderItem = this.paginatedOrderItems[event.pageIndex];
  }

  searchTypedItems() {
    this.paginatedItems = paginateObject<ItemTable>(filterTable<ItemTable>(this.itemsTable, this.search), this.pageSize);
    this.currentPageItem = this.paginatedItems[0];
  }

  searchTypedOrderItems() {
    this.paginatedOrderItems = paginateObject<OrderToItemTable>(filterTable<OrderToItemTable>(this.orderItemsTable, this.search),
      this.pageSize);
    this.currentPageOrderItem = this.paginatedOrderItems[0];
  }

  onDelete(id: number) {
    this.alertService.clear();
    Swal.fire({
      title: 'Desea Eliminar el Insumo?',
      // text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.isLoading = true;
        this.service.deleteItem(id)
          .subscribe(response => {
            this.isLoading = false;
            this.reloadCurrentRoute();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El Insumo se ha Eliminado Exitosamente',
              showConfirmButton: false,
              timer: 1500
            });
          }, error => {
            console.log(error);
            this.alertService.error('Error al Eliminar el Insumo', false);
          });
      }
    });
  }

}
