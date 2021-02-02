import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {GeneralDevice, PostGeneralDevice} from '../../../entities/generalDevice';
import {GeneralDeviceService} from '../../../services/generalDevice/general-device.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AlertService} from '../../../services/alert/alert.service';

@Component({
  selector: 'app-general-device-form',
  templateUrl: './general-device-form.component.html',
  styleUrls: ['./general-device-form.component.css']
})
export class GeneralDeviceFormComponent implements OnInit {
  generalDeviceForm = new FormGroup({
    name : new FormControl('', [Validators.required, Validators.maxLength(20)]),
    description : new FormControl('', [Validators.required, Validators.maxLength(40)])
  });
  edit = false;
  generalDeviceId: number;
  submitted = false;
  buttonDisabled = false;
  isLoading = true;
  generalDevice: GeneralDevice;
  modal = false;

  constructor(private service: GeneralDeviceService, private modalService: NgbModal,
              private router: Router, private route: ActivatedRoute, private alertService: AlertService) { }

  ngOnInit() {
    this.modal = Boolean(localStorage.getItem('modal'));
    this.route.params.subscribe(params => {
      this.generalDeviceId = parseInt(params.generalDeviceId, 0);
    });
    if (this.generalDeviceId) {
      this.service.getGeneralDeviceById(this.generalDeviceId).subscribe(response => {
        console.log(response);
        this.generalDevice = response.body['data'];
        this.f.name.setValue(this.generalDevice.name);
        this.f.description.setValue(this.generalDevice.description);
      });
    }
    this.isLoading = false;
  }

  get f() {
    return this.generalDeviceForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.generalDeviceForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.alertService.clear();
    this.buttonDisabled = true;
    const body: PostGeneralDevice = {
      name: this.generalDeviceForm.value.name,
      description: this.generalDeviceForm.value.description
    };
    console.log(body);
    if (!this.generalDeviceId) {
      this.service.postGeneralDevice(body)
        .subscribe(response => {
          if (!this.modal) {
            this.router.navigate(['/generalDevices']).then(result =>
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'El Equipo Médico General se ha Agregado Exitosamente',
                showConfirmButton: false,
                timer: 1500
              })
            );
          } else {
            localStorage.removeDevice('modal');
            this.modalService.dismissAll();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El Equipo Médico General se ha Agregado Exitosamente',
              showConfirmButton: false,
              timer: 1500
            });
          }
        }, error => {
          this.isLoading = false;
          this.buttonDisabled = false;
          this.alertService.error('Error al Agregar El Equipo Médico General', false);
        });
    } else {
      this.service.updateGeneralDevice(body, this.generalDeviceId)
        .subscribe(response => {
          this.router.navigate(['/generalDevices']).then(result =>
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El Equipo Médico General se ha Agregado Exitosamente',
              showConfirmButton: false,
              timer: 1500
            })
          );
        }, error => {
          this.isLoading = false;
          this.buttonDisabled = false;
          this.alertService.error('Error al Editar el Equipo Médico General', false);
        });
    }
  }

}
