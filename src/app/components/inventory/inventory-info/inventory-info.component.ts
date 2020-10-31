import { Component, OnInit } from '@angular/core';
import {Inventory, Stock, StockTable, UpdateStock} from '../../../entities/inventory';
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
import {StockService} from '../../../services/stock/stock.service';
import {StockCriticUnitComponent} from '../stock-critic-unit/stock-critic-unit.component';

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
              private modalService: NgbModal, private stockService: StockService) { }

  ngOnInit() {
    this.alertService.clear();
    const user: User = JSON.parse(localStorage.getItem('User') );
    this.rol = user.rol;
    if (this.rol.name === roles.admin || this.rol.name === roles.superUser) {
      this.service.getInventoryById(mainInventory.id)
        .subscribe(response => {
          this.inventory = response.body['data'];
          this.stocks = this.inventory.stock;
          this.stocksTable = this.stocks.map(stock => {
            const element: StockTable = {
              id: stock.id,
              amount: stock.amount,
              criticUnit: stock.criticUnit,
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

  checkStatus(amount: number, criticUnit: number): string {
    if (amount === 0) {
      return 'No Disponible';
    }
    if (criticUnit > amount) {
      return 'Stock Bajo';
    }
    return 'Disponible';
  }

  checkStatusIcon(amount: number, criticUnit: number): string {
    if (amount === 0) {
      return 'label label-danger';
    }
    if (criticUnit > amount) {
      return 'label label-warning';
    }
    return 'label label-primary';
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  async updateCriticUnit(stock: StockTable) {
    const modalRef: NgbModalRef = this.modalService.open(StockCriticUnitComponent, {centered: true});
    modalRef.componentInstance.item = this.showItem(stock);
    modalRef.componentInstance.unit = stock.criticUnit;
    modalRef.componentInstance.isClient = true;
    await modalRef.result.then((unitResult) => {
      this.isLoading = true;
      const body: UpdateStock = {
        amount: stock.amount,
        criticUnit: unitResult
      };
      console.log(body);
      this.stockService.putStock(body, stock.id).subscribe(response => {
        console.log(response);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'La Unidad Crítica se ha Actualizado',
          showConfirmButton: false,
          timer: 1500
        });
        this.ngOnInit();
      }, error => {
        this.isLoading = false;
        console.log(error);
        this.alertService.error('Error al Actualizar la Unidad Crítica', false);
      });
    });
  }

  showItem(stock: StockTable): string {
    let itemDisplay = '';
    itemDisplay = itemDisplay + stock.generalItem + ' ' + stock.brand + ' ' + stock.presentation;
    return itemDisplay;
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
