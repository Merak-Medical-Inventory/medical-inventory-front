import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DepartmentOrderStatsTable, ItemDepartmentOrderStats, ItemDepartmentOrderStatsTable} from '../../../entities/stats';
import {Options} from 'select2';
import {Select2OptionData} from 'ng-select2';
import {StatsService} from '../../../services/stats/stats.service';
import {Router} from '@angular/router';
import {AlertService} from '../../../services/alert/alert.service';
import {filterTable, paginateObject} from '../../../util';
import {PageEvent} from '@angular/material';
// @ts-ignore
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {ChartType} from 'chart.js';
import {Label} from 'ng2-charts';

@Component({
  selector: 'app-items-departments-order',
  templateUrl: './items-departments-order.component.html',
  styleUrls: ['./items-departments-order.component.css']
})
export class ItemsDepartmentsOrderComponent implements OnInit {
  filterForm = new FormGroup({
    order: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required])
  });
  items: ItemDepartmentOrderStats[] = [];
  itemsTable: ItemDepartmentOrderStatsTable[] = [];
  currentPageItem: ItemDepartmentOrderStatsTable[];
  paginatedItems: ItemDepartmentOrderStatsTable[][] = [];
  search = '';
  submitted = false;
  buttonDisabled = false;
  isLoading = true;
  pageSize = 10;
  orderOptions: Options;
  orders: Select2OptionData[] = [];
  asc: any;
  barChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: { data: number[]; label: string; }[];
  doughnutChartLabels: Label[] = [];
  doughnutChartType: ChartType = 'doughnut';
  doughnutChartData: { data: number[]; label: string; }[];

  constructor(private service: StatsService, private router: Router, private alertService: AlertService) { }

  ngOnInit() {
    this.orderOptions = {
      width: '100%',
      placeholder: {id: '', text: 'Seleccione el Orden de Búsqueda...'}
    };
    this.orders = [
      {
        id: 'DESC',
        text: 'Más Pedidos'
      },
      {
        id: 'ASC',
        text: 'Menos Pedidos'
      }
    ];
    this.f.order.setValue(0);
    this.asc = 'DESC';
    this.getData();
  }

  getData() {
    let body;
    if (this.f.startDate.value && this.f.endDate.value) {
      body = {
        order: this.asc,
        startDate: this.f.startDate.value,
        endDate: this.f.endDate.value
      };
    } else {
      body = {
        order: this.asc
      };
    }
    console.log(body);
    this.service.getItemsDepartmentsOrder(body)
      .subscribe(response => {
        this.items = response.body['data'];
        console.log(this.items);
        this.itemsTable = this.items.map(item => {
          const element: ItemDepartmentOrderStatsTable = {
            orders: item.orders,
            total: item.total,
            name: item.item.generalItem.name + ' ' +  item.item.brand.name + ' ' + item.item.presentation.quantity + ' ' +
              item.item.presentation.name + ' ' + item.item.presentation.measure_value + ' ' + item.item.presentation.measure
          };
          return element;
        });
        this.setChartData();
        console.log(this.itemsTable);
        this.paginatedItems = paginateObject<ItemDepartmentOrderStatsTable>(this.itemsTable, this.pageSize);
        this.currentPageItem = this.paginatedItems[0];
        this.submitted = false;
        this.buttonDisabled = false;
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
        this.submitted = false;
        this.buttonDisabled = false;
        console.log(error.error);
        this.alertService.error('Error al Obtener los Insumos', false);
      });
  }

  setChartData() {
    this.barChartLabels = [];
    this.barChartData = [];
    this.doughnutChartData = [];
    this.doughnutChartLabels = [];
    const dataChartOrders: number[] = [];
    const dataChartTotal: number[] = [];
    this.itemsTable.forEach((item, i) => {
      dataChartOrders.push(item.orders);
      dataChartTotal.push(item.total);
      this.barChartLabels.push(item.name);
      this.doughnutChartLabels.push(item.name);
      if (i === 4) {
        return false;
      }
    });
    this.barChartData = [{data: dataChartOrders, label: 'Número de Pedidos'}, {data: dataChartTotal, label: 'Cantidad Solicitada'}];
    this.doughnutChartData = [{data: dataChartOrders, label: 'Número de Pedidos'}];
  }

  orderChanged(data: { value: string }) {
    this.asc = data;
    this.f.order.setValue(data.value);
    this.getData();
  }

  get f() {
    return this.filterForm.controls;
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  onPageChanged(event: PageEvent) {
    this.currentPageItem = this.paginatedItems[event.pageIndex];
  }

  checkOrder() {
    return this.asc === 'DESC';
  }

  searchTyped() {
    this.paginatedItems = paginateObject<ItemDepartmentOrderStatsTable>(filterTable<ItemDepartmentOrderStatsTable>
      (this.itemsTable, this.search),
      this.pageSize);
    this.currentPageItem = this.paginatedItems[0];
  }

  onSubmit() {
    this.submitted = true;
    if (this.filterForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.alertService.clear();
    this.buttonDisabled = true;
    if (this.f.startDate.value > this.f.endDate.value) {
      this.isLoading = false;
      this.submitted = false;
      this.buttonDisabled = false;
      this.alertService.error('La Fecha Inicial no Puede ser Mayor a la Fecha Final', false);
    } else {
      this.getData();
    }
  }

  createPdf() {
    if (this.currentPageItem && this.currentPageItem.length !== 0) {
      this.isLoading = true;
      const DATA = document.getElementById('htmlData');
      const doc = new jsPDF('p', 'pt', 'a4');
      const options = {
        background: 'white',
        scale: 3
      };
      html2canvas(DATA, options).then((canvas) => {

        const img = canvas.toDataURL('image/PNG');

        // Add image Canvas to PDF
        const bufferX = 15;
        const bufferY = 15;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
        return doc;
      }).then((docResult) => {
        this.isLoading = false;
        docResult.save(`${new Date().toISOString()}_Insumos.pdf`);
      });
      this.isLoading = false;
    } else {
      this.alertService.error('No es Posible Exportar PDF sin Registros', false);
    }
  }

}
