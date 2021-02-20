import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Options} from 'select2';
import {Select2OptionData} from 'ng-select2';
import {Maintenance, PostMaintenance} from '../../../entities/maintenance';
import {MaintenanceService} from '../../../services/maintenance/maintenance.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../../services/alert/alert.service';
import {DeviceService} from '../../../services/device/device.service';
import {Device} from '../../../entities/device';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-maintenance-form',
  templateUrl: './maintenance-form.component.html',
  styleUrls: ['./maintenance-form.component.css']
})
export class MaintenanceFormComponent implements OnInit {
  maintenanceForm = new FormGroup({
    device: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.maxLength(40)]),
    date: new FormControl('', [Validators.required]),
  });
  deviceOptions: Options;
  devices: Select2OptionData[] = [];
  devicesData: Device[] = [];
  maintenanceId: number;
  submitted = false;
  buttonDisabled = false;
  isLoading = true;
  maintenance: Maintenance;

  constructor(private service: MaintenanceService, private deviceService: DeviceService,
              private alertService: AlertService, private modalService: NgbModal,
              private router: Router, private route: ActivatedRoute, private datePipe: DatePipe) { }

  ngOnInit() {
    this.deviceOptions = {
      width: '100%',
      placeholder: {id: '', text: 'Seleccione el Equipo Médico...'}
    };
    this.route.params.subscribe(params => {
      this.maintenanceId = parseInt(params.maintenanceId, 0);
    });
    this.getSelectDevice().then(() => {
      if (this.maintenanceId) {
        this.service.getMaintenanceById(this.maintenanceId).subscribe(response => {
          this.maintenance = response.body['data'];
          console.log(this.maintenance);
          this.f.device.setValue(this.maintenance.device.id);
          this.f.description.setValue(this.maintenance.description);
          this.f.date.setValue(this.datePipe.transform(this.maintenance.date, 'yyyy-MM-dd'));
        });
      }
      this.isLoading = false;
    });
  }

  get f() {
    return this.maintenanceForm.controls;
  }

  async getSelectDevice() {
    this.alertService.clear();
    const array: Select2OptionData[] = [];
    this.devices = await this.deviceService.getDevices().toPromise().then(value => {
      this.devicesData = value.body['data'];
      for (const device of this.devicesData) {
        const data: Select2OptionData = {
          id: device.id.toString(),
          text: device.generalDevice.name + ' ' + device.serial_code
        };
        array.push(data);
      }
      return array;
    })
      .catch( error => {
        this.alertService.error('Error al Obtener los Equipos Médicos', false);
        return array;
      });
  }

  deviceChanged(data: { value: string }) {
    this.f.device.setValue(data.value);
  }

  onSubmit() {
    this.submitted = true;
    if (this.maintenanceForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.alertService.clear();
    this.buttonDisabled = true;
    const body: PostMaintenance = {
      device: Number(this.maintenanceForm.value.device),
      description: this.maintenanceForm.value.description,
      date: this.maintenanceForm.value.date
    };
    console.log(body);
    if (!this.maintenanceId) {
      this.service.postMaintenance(body)
        .subscribe(response => {
          this.router.navigate(['/maintenances']).then(result =>
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El Mantenimiento se ha Agregado Exitosamente',
              showConfirmButton: false,
              timer: 1500
            })
          );
        }, error => {
          this.isLoading = false;
          this.buttonDisabled = false;
          this.alertService.error('Error al Agregar el Mantenimiento', false);
        });
    } else {
      this.service.updateMaintenance(body, this.maintenanceId)
        .subscribe(response => {
          this.router.navigate(['/maintenances']).then(result =>
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El Mantenimiento se ha Editado Exitosamente',
              showConfirmButton: false,
              timer: 1500
            })
          );
        }, error => {
          this.isLoading = false;
          this.buttonDisabled = false;
          this.alertService.error('Error al Editar el Mantenimiento', false);
        });
    }
  }

}
