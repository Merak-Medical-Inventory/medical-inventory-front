import { Component, OnInit } from '@angular/core';
import {Inventory, Stock, StockTable} from '../../../entities/inventory';
import {InventoryService} from '../../../services/inventory/inventory.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {AlertService} from '../../../services/alert/alert.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {filterTable, paginateObject} from '../../../util';
import {PageEvent} from '@angular/material';
import {Rol} from '../../../entities/rol';
import {User} from '../../../entities/user';
import {roles} from '../../../constants/rolConstants';
import {mainInventory} from '../../../constants/inventoryConstans';
import {LotToStock} from '../../../entities/lot';
import {LotListComponent} from '../../lot/lot-list/lot-list.component';

@Component({
  selector: 'app-inventory-info',
  templateUrl: './inventory-info.component.html',
  styleUrls: ['./inventory-info.component.css']
})
export class InventoryInfoComponent implements OnInit {
  inventory: Inventory;
  stocks: Stock[] = [];
  stocksTable: StockTable[] = [];
  currentPageStock: StockTable[];
  paginatedStock: StockTable[][] = [];
  search = '';
  isLoading = true;
  pageSize = 10;
  rol: Rol;

  constructor(private service: InventoryService, private router: Router, private alertService: AlertService,
              private modalService: NgbModal) { }

  ngOnInit() {
    const user: User = JSON.parse(localStorage.getItem('User') );
    this.rol = user.rol;
    if (this.rol.name === roles.admin || this.rol.name === roles.superUser) {
      this.service.getInventoryById(mainInventory.id)
        .subscribe(response => {
          this.inventory = response.body['data'];
          this.stocks = this.inventory.stock;
          this.stocksTable = this.stocks.map(stock => {
            let cu: string;
            if (stock.criticUnit) {
              cu = stock.criticUnit.toString();
            } else {
              cu = '';
            }
            const element: StockTable = {
              id: stock.id,
              amount: stock.amount,
              criticUnit: cu,
              code: stock.item.code,
              brand_code: stock.item.brand_code,
              generalItem: stock.item.generalItem.name,
              category: stock.item.category.name,
              brand: stock.item.brand.name,
              presentation: stock.item.presentation.quantity + ' ' + stock.item.presentation.name + ' ' +
                stock.item.presentation.measure_value + ' ' + stock.item.presentation.measure,
              LotToStock: stock.LotToStock
            };
            return element;
          });
          this.paginatedStock = paginateObject<StockTable>(this.stocksTable, this.pageSize);
          this.currentPageStock = this.paginatedStock[0];
          this.isLoading = false;
        }, error => {
          this.isLoading = false;
          console.log(error.error);
          this.alertService.error('Error al Obtener la Información del Inventario Principal', false);
        });
    }
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  showLots(lots: LotToStock[]) {
    const modalRef: NgbModalRef = this.modalService.open(LotListComponent, { centered: true } );
    modalRef.componentInstance.lots = lots;
    modalRef.componentInstance.isClient = true;
  }

  onPageChanged(event: PageEvent) {
    this.currentPageStock = this.paginatedStock[event.pageIndex];
  }

  searchTyped() {
    this.paginatedStock = paginateObject<StockTable>(filterTable<StockTable>(this.stocksTable, this.search), this.pageSize);
    this.currentPageStock = this.paginatedStock[0];
  }

}
