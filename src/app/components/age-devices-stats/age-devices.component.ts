import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {AlertService} from '../../services/alert/alert.service';
import {filterTable, paginateObject} from '../../util';
import {PageEvent} from '@angular/material';
import {Device} from '../../entities/device';
import {DeviceAgeStatsTable, PostDeviceAgeStats} from '../../entities/stats';
import {StatsService} from '../../services/stats/stats.service';
// @ts-ignore
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {Options} from 'select2';
import {Select2OptionData} from 'ng-select2';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ExcelService} from '../../services/excel/excel.service';

@Component({
  selector: 'app-age-devices',
  templateUrl: './age-devices.component.html',
  styleUrls: ['./age-devices.component.css']
})
export class AgeDevicesComponent implements OnInit {
  orderByForm = new FormGroup({
    order: new FormControl('', [Validators.required])
  });
  devices: Device[] = [];
  devicesTable: DeviceAgeStatsTable[] = [];
  currentPageDevice: DeviceAgeStatsTable[];
  paginatedDevices: DeviceAgeStatsTable[][] = [];
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
  orderOptions: Options;
  orders: Select2OptionData[] = [];
  asc: boolean;

  constructor(private service: StatsService, private router: Router, private alertService: AlertService,
              private excelService: ExcelService) { }

  ngOnInit() {
    this.orderOptions = {
      width: '100%',
      placeholder: {id: '', text: 'Seleccione el Orden de Búsqueda...'}
    };
    this.orders = [
      {
        id: '0',
        text: 'Más Antiguos'
      },
      {
        id: '1',
        text: 'Más Nuevos'
      }
    ];
    this.f.order.setValue(0);
    this.asc = true;
    this.getData();
  }

  getData() {
    const body: PostDeviceAgeStats = {
      asc: this.asc
    };
    console.log(body);
    this.service.getDevicesAgeStats(body)
      .subscribe(response => {
        this.devices = response.body['data'];
        console.log(this.devices);
        this.devices = this.devices.map(value => {
          const date = new Date(value.date);
          // @ts-ignore
          value.date = `${date.getDate()} de ${this.months[date.getMonth()]} de ${date.getFullYear()}`;
          return value;
        });
        this.devicesTable = this.devices.map(device => {
          const element: DeviceAgeStatsTable = {
            id: device.id,
            serial_code: device.serial_code,
            date: device.date,
            production_year: device.production_year,
            generalDevice: device.generalDevice.name
          };
          return element;
        });
        this.paginatedDevices = paginateObject<DeviceAgeStatsTable>(this.devicesTable, this.pageSize);
        this.currentPageDevice = this.paginatedDevices[0];
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
        console.log(error.error);
        this.alertService.error('Error al Obtener los Equipos Médicos', false);
      });
  }

  orderChanged(data: { value: string }) {
    this.asc = !this.asc;
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
    this.currentPageDevice = this.paginatedDevices[event.pageIndex];
  }

  searchTyped() {
    this.paginatedDevices = paginateObject<DeviceAgeStatsTable>(filterTable<DeviceAgeStatsTable>(this.devicesTable, this.search),
      this.pageSize);
    this.currentPageDevice = this.paginatedDevices[0];
  }

  createPdf() {
    if (this.currentPageDevice && this.currentPageDevice.length !== 0) {
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
        docResult.save(`${new Date().toISOString()}_EquiposMedicos.pdf`);
      });
      this.isLoading = false;
    } else {
      this.alertService.error('No es Posible Exportar PDF sin Registros', false);
    }
  }

  exportExcel() {
    if (this.devicesTable && this.devicesTable.length !== 0) {
      this.isLoading = true;
      try {
        this.excelService.exportAsExcelFile(this.devicesTable, 'EquiposMedicos_Edad');
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
