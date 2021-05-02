import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ItemDepartmentOrderStats, ItemDepartmentOrderStatsTable} from '../../../entities/stats';
import {Options} from 'select2';
import {Select2OptionData} from 'ng-select2';
import {User} from '../../../entities/user';
import {Label} from 'ng2-charts';
import {ChartType} from 'chart.js';
import {StatsService} from '../../../services/stats/stats.service';
import {Router} from '@angular/router';
import {AlertService} from '../../../services/alert/alert.service';
import {filterTable, paginateObject} from '../../../util';
import {PageEvent} from '@angular/material';
// @ts-ignore
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {CategoryService} from '../../../services/category/category.service';
import {Category} from '../../../entities/category';
import {ExcelService} from '../../../services/excel/excel.service';

@Component({
  selector: 'app-items-order',
  templateUrl: './items-order.component.html',
  styleUrls: ['./items-order.component.css']
})
export class ItemsOrderComponent implements OnInit {
  filterForm = new FormGroup({
    order: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required])
  });
  items: ItemDepartmentOrderStats[] = [];
  itemsTable: ItemDepartmentOrderStatsTable[] = [];
  currentPageItem: ItemDepartmentOrderStatsTable[];
  paginatedItems: ItemDepartmentOrderStatsTable[][] = [];
  categoryOptions: Options;
  categories: Select2OptionData[] = [];
  categoriesData: Category[] = [];
  search = '';
  submitted = false;
  buttonDisabled = false;
  isLoading = true;
  pageSize = 10;
  orderOptions: Options;
  orders: Select2OptionData[] = [];
  asc: any;
  user: User;
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

  constructor(private service: StatsService, private router: Router, private alertService: AlertService,
              private categoryService: CategoryService, private excelService: ExcelService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('User') );
    this.orderOptions = {
      width: '100%',
      placeholder: {id: '', text: 'Seleccione el Orden de Búsqueda...'}
    };
    this.categoryOptions = {
      width: '100%',
      placeholder: {id: '', text: 'Seleccione la Categoría...'}
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
    this.f.category.setValue(0);
    this.f.order.setValue(0);
    this.asc = 'DESC';
    this.getSelectCategories().then(() => {
      this.getData();
    });
  }

  getData() {
    let body;
    if (this.f.startDate.value && this.f.endDate.value) {
        if (this.f.category.value === 0) {
          body = {
            order: this.asc,
            startDate: this.f.startDate.value,
            endDate: this.f.endDate.value,
            department: this.user.department.id
          };
        } else {
          body = {
            order: this.asc,
            startDate: this.f.startDate.value,
            endDate: this.f.endDate.value,
            department: this.user.department.id,
            category: this.f.category.value
          };
        }
    } else {
      if (this.f.category.value === 0) {
        body = {
          order: this.asc
        };
      } else {
        body = {
          order: this.asc,
          category: this.f.category.value
        };
      }
    }
    console.log(body);
    this.service.getItemsOrder(body)
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

  categoryChanged(data: { value: string }) {
    this.f.category.setValue(data);
    this.getData();
  }

  async getSelectCategories() {
    this.alertService.clear();
    const array: Select2OptionData[] = [];
    this.categories = await this.categoryService.getCategories().toPromise().then(value => {
      this.categoriesData = value.body['data'];
      const initialData: Select2OptionData = {
        id: '0',
        text: 'Todas'
      };
      array.push(initialData);
      for (const category of this.categoriesData) {
        const data: Select2OptionData = {
          id: category.id.toString(),
          text: category.name
        };
        array.push(data);
      }
      return array;
    });
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

  exportExcel() {
    if (this.itemsTable && this.itemsTable.length !== 0) {
      this.isLoading = true;
      try {
        this.excelService.exportAsExcelFile(this.itemsTable, 'Pedidos_Insumos');
        this.isLoading = false;
      } catch (e) {
        this.alertService.error('No se Pudo Exportar el Excel', false);
        this.isLoading = false;
      }
    } else {
      this.alertService.error('No es Posible Exportar Excel sin Registros', false);
    }
  }

}
