import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DepartmentOrderStatsTable, PostDepartmentOrderStats} from '../../../entities/stats';
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

@Component({
  selector: 'app-departments-order',
  templateUrl: './departments-order.component.html',
  styleUrls: ['./departments-order.component.css']
})
export class DepartmentsOrderComponent implements OnInit {
  orderByForm = new FormGroup({
    order: new FormControl('', [Validators.required])
  });
  departmentsTable: DepartmentOrderStatsTable[] = [];
  currentPageDepartment: DepartmentOrderStatsTable[];
  paginatedDepartments: DepartmentOrderStatsTable[][] = [];
  search = '';
  isLoading = true;
  pageSize = 10;
  orderOptions: Options;
  orders: Select2OptionData[] = [];
  asc: any;

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
    const body: PostDepartmentOrderStats = {
      order: this.asc
    };
    console.log(body);
    this.service.getDepartmentsOrder(body)
      .subscribe(response => {
        this.departmentsTable = response.body['data'];
        console.log(this.departmentsTable);
        this.paginatedDepartments = paginateObject<DepartmentOrderStatsTable>(this.departmentsTable, this.pageSize);
        this.currentPageDepartment = this.paginatedDepartments[0];
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
        console.log(error.error);
        this.alertService.error('Error al Obtener las Unidades Médicas', false);
      });
  }

  orderChanged(data: { value: string }) {
    this.asc = data;
    this.f.order.setValue(data.value);
    this.getData();
  }

  get f() {
    return this.orderByForm.controls;
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  onPageChanged(event: PageEvent) {
    this.currentPageDepartment = this.paginatedDepartments[event.pageIndex];
  }

  checkOrder() {
    return this.asc === 'DESC';
  }

  searchTyped() {
    this.paginatedDepartments = paginateObject<DepartmentOrderStatsTable>(filterTable<DepartmentOrderStatsTable>
      (this.departmentsTable, this.search),
      this.pageSize);
    this.currentPageDepartment = this.paginatedDepartments[0];
  }

  createPdf() {
    if (this.currentPageDepartment && this.currentPageDepartment.length !== 0) {
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
        docResult.save(`${new Date().toISOString()}_UnidadesMédicas.pdf`);
      });
      this.isLoading = false;
    } else {
      this.alertService.error('No es Posible Exportar PDF sin Registros', false);
    }
  }

}
