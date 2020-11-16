import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderDepartmentService} from '../../../services/orderDepartment/order-department.service';
import {AlertService} from '../../../services/alert/alert.service';
import {StockForOrderTable, StockForOrder, AcceptOrderDepartment} from '../../../entities/orderDepartment';
import {filterTable, paginateObject} from '../../../util';
import {PageEvent} from '@angular/material';
import {User} from '../../../entities/user';
import Swal from "sweetalert2";
import {PostItemOrder} from '../../../entities/order';

@Component({
  selector: 'app-accept-order-table',
  templateUrl: './accept-order-table.component.html',
  styleUrls: ['./accept-order-table.component.css']
})
export class AcceptOrderTableComponent implements OnInit {
  orderId: number;
  stocksOrder: StockForOrder[] = [];
  stocksOrderTable: StockForOrderTable[] = [];
  currentPageStockOrder: StockForOrderTable[];
  paginatedStockOrder: StockForOrderTable[][] = [];
  search = '';
  isLoading = true;
  pageSize = 10;
  buttonDisabled = false;
  user: User;

  constructor(private service: OrderDepartmentService, private alertService: AlertService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.orderId = parseInt(params.orderId, 0);
    });
    this.service.getStockForOrder(this.orderId).subscribe(response => {
      console.log(response);
      this.stocksOrder = response.body['data'];
      let avAmount: number;
      this.stocksOrderTable = this.stocksOrder.map(stock => {
        if (stock.orderAmount > stock.actualAmount) {
          avAmount = stock.actualAmount;
        } else {
          avAmount = stock.orderAmount;
        }
        const element: StockForOrderTable = {
          actualAmount: avAmount,
          id: stock.item.id,
          code: stock.item.code,
          brand_code: stock.item.brand_code,
          generalItem: stock.item.generalItem.name,
          category: stock.item.category.name,
          brand: stock.item.brand.name,
          presentation: stock.item.presentation.quantity + ' ' + stock.item.presentation.name + ' ' +
            stock.item.presentation.measure_value + ' ' + stock.item.presentation.measure,
          orderAmount: stock.orderAmount,
          availableAmount: stock.actualAmount
        };
        return element;
      });
      this.paginatedStockOrder = paginateObject<StockForOrderTable>(this.stocksOrderTable, this.pageSize);
      this.currentPageStockOrder = this.paginatedStockOrder[0];
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      console.log(error.error);
      this.alertService.error('Error al Obtener la Información de los Stocks en el Pedido Seleccionado', false);
    });
  }

  onPageChanged(event: PageEvent) {
    this.currentPageStockOrder = this.paginatedStockOrder[event.pageIndex];
  }

  searchTyped() {
    this.paginatedStockOrder = paginateObject<StockForOrderTable>(filterTable<StockForOrderTable>(this.stocksOrderTable, this.search)
      , this.pageSize);
    this.currentPageStockOrder = this.paginatedStockOrder[0];
  }

  checkStatus(stockAmount: number, orderAmount: number): string {
    if (stockAmount === 0) {
      return 'No Disponible';
    }
    if (orderAmount > stockAmount) {
      return 'Parcial';
    }
    return 'Total';
  }

  checkStatusIcon(stockAmount: number, orderAmount: number): string {
    if (stockAmount === 0) {
      return 'label label-danger';
    }
    if (orderAmount > stockAmount) {
      return 'label label-warning';
    }
    return 'label label-primary';
  }

  onDelete(id: number) {
    this.stocksOrderTable = this.stocksOrderTable.filter(function(item) {
      return item.id !== id;
    });
    this.paginatedStockOrder = paginateObject<StockForOrderTable>(this.stocksOrderTable, this.pageSize);
    this.currentPageStockOrder = this.paginatedStockOrder[0];
  }

  async onSubmit() {
    this.buttonDisabled = true;
    const {value: message} = await Swal.fire({
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
      const itemsOrder: PostItemOrder[] = this.stocksOrderTable.map(stock => {
        const element: PostItemOrder = {
          id: stock.id,
          amount: stock.actualAmount
        };
        return element;
      });
      const body: AcceptOrderDepartment = {
        message: String(message),
        sender: this.user.id,
        items: itemsOrder
      };
      this.service.acceptOrderDepartment(body, this.orderId)
        .subscribe(response => {
          this.router.navigate(['/orderDepartmentAdmin']).then(result =>
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El Pedido se ha Aprobado Exitosamente',
              showConfirmButton: false,
              timer: 1500
            })
          );
        }, error => {
          this.buttonDisabled = false;
          this.isLoading = false;
          this.buttonDisabled = false;
          this.alertService.error('Error al Aprobar el Pedido', false);
        });
    }
    this.buttonDisabled = false;
  }

}
