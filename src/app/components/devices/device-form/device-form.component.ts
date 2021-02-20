import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Options} from 'select2';
import {Select2OptionData} from 'ng-select2';
import {Device, PostDevice, UpdateDevice} from '../../../entities/device';
import {DeviceService} from '../../../services/device/device.service';
import {MakerService} from '../../../services/maker/maker.service';
import {BrandService} from '../../../services/brand/brand.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Brand} from '../../../entities/brand';
import {BrandFormComponent} from '../../brands/brand-form/brand-form.component';
import {Maker} from '../../../entities/maker';
import {MakerFormComponent} from '../../makers/maker-form/maker-form.component';
import {AlertService} from '../../../services/alert/alert.service';
import {GeneralDevice} from '../../../entities/generalDevice';
import {GeneralDeviceService} from '../../../services/generalDevice/general-device.service';
import {GeneralDeviceFormComponent} from '../../general-devices/general-device-form/general-device-form.component';
import {Inventory} from '../../../entities/inventory';
import {InventoryService} from '../../../services/inventory/inventory.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.css']
})
export class DeviceFormComponent implements OnInit {
  deviceForm = new FormGroup({
    serial_code: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    power_supply:  new FormControl('', [Validators.required, Validators.maxLength(20)]),
    date: new FormControl('', [Validators.required]),
    warranty_date: new FormControl('', [Validators.required]),
    production_year: new FormControl('', [Validators.required]),
    generalDevice: new FormControl('', [Validators.required]),
    brand: new FormControl('', [Validators.required]),
    maker: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required])
  });
  generalDeviceOptions: Options;
  generalDevices: Select2OptionData[] = [];
  generalDevicesData: GeneralDevice[] = [];
  makerOptions: Options;
  makers: Select2OptionData[] = [];
  makersData: Maker[] = [];
  brandOptions: Options;
  brands: Select2OptionData[] = [];
  brandsData: Brand[] = [];
  locationOptions: Options;
  locations: Select2OptionData[] = [];
  locationsData: Inventory[] = [];
  deviceId: number;
  submitted = false;
  buttonDisabled = false;
  isLoading = true;
  device: Device;

  constructor(private service: DeviceService, private generalDeviceService: GeneralDeviceService,
              private makerService: MakerService, private brandService: BrandService,
              private locationService: InventoryService, private alertService: AlertService, private modalService: NgbModal,
              private router: Router, private route: ActivatedRoute, private datePipe: DatePipe) { }

  ngOnInit() {
    this.generalDeviceOptions = {
      width: '100%',
      placeholder: {id: '', text: 'Seleccione el Equipo Médico General...'}
    };
    this.makerOptions = {
      width: '100%',
      placeholder: {id: '', text: 'Seleccione el Fabricante...'}
    };
    this.brandOptions = {
      width: '100%',
      placeholder: {id: '', text: 'Seleccione la Marca...'}
    };
    this.locationOptions = {
      width: '100%',
      placeholder: {id: '', text: 'Seleccione la Ubicación...'}
    };
    this.route.params.subscribe(params => {
      this.deviceId = parseInt(params.deviceId, 0);
    });
    this.getSelectGeneralDevice().then(() => {
      this.getSelectMakers().then(() => {
        this.getSelectBrands().then(() => {
          this.getSelectLocations().then(() => {
            if (this.deviceId) {
              this.service.getDeviceById(this.deviceId).subscribe(response => {
                this.device = response.body['data'];
                console.log(response);
                this.f.serial_code.setValue(this.device.serial_code);
                this.f.power_supply.setValue(this.device.power_supply);
                this.f.date.setValue(this.datePipe.transform(this.device.date, 'yyyy-MM-dd'));
                this.f.warranty_date.setValue(this.datePipe.transform(this.device.warranty_date, 'yyyy-MM-dd'));
                this.f.production_year.setValue(this.device.production_year);
                this.f.generalDevice.setValue(this.device.generalDevice.id);
                this.f.maker.setValue(this.device.maker.id);
                this.f.brand.setValue(this.device.brand.id);
                this.f.location.setValue(this.device.location.id);
              });
            }
            this.isLoading = false;
          });
        });
      });
    });
  }

  get f() {
    return this.deviceForm.controls;
  }

  getCurrentYear() {
   return new Date().getFullYear();
  }

  async getSelectGeneralDevice() {
    this.alertService.clear();
    const array: Select2OptionData[] = [];
    this.generalDevices = await this.generalDeviceService.getGeneralDevices().toPromise().then(value => {
      this.generalDevicesData = value.body['data'];
      for (const generalDevice of this.generalDevicesData) {
        const data: Select2OptionData = {
          id: generalDevice.id.toString(),
          text: generalDevice.name
        };
        array.push(data);
      }
      return array;
    })
      .catch( error => {
        this.alertService.error('Error al Obtener los Equipos Médicos Generales', false);
        return array;
      });
  }

  generalDeviceChanged(data: { value: string }) {
    this.f.generalDevice.setValue(data.value);
  }

  async getSelectMakers() {
    this.alertService.clear();
    const array: Select2OptionData[] = [];
    this.makers = await this.makerService.getMakers().toPromise().then(value => {
      this.makersData = value.body['data'];
      for (const maker of this.makersData) {
        const data: Select2OptionData = {
          id: maker.id.toString(),
          text: maker.name
        };
        array.push(data);
      }
      return array;
    })
      .catch( error => {
        this.alertService.error('Error al Obtener las Categorías', false);
        return array;
      });
  }

  makerChanged(data: { value: string }) {
    this.f.maker.setValue(data.value);
  }

  async getSelectBrands() {
    this.alertService.clear();
    const array: Select2OptionData[] = [];
    this.brands = await this.brandService.getBrands().toPromise().then(value => {
      this.brandsData = value.body['data'];
      for (const brand of this.brandsData) {
        const data: Select2OptionData = {
          id: brand.id.toString(),
          text: brand.name
        };
        array.push(data);
      }
      return array;
    })
      .catch( error => {
        this.alertService.error('Error al Obtener las Marcas', false);
        return array;
      });
  }

  brandChanged(data: { value: string }) {
    this.f.brand.setValue(data.value);
  }

  async getSelectLocations() {
    this.alertService.clear();
    const array: Select2OptionData[] = [];
    this.locations = await this.locationService.getInventories().toPromise().then(value => {
      this.locationsData = value.body['data'];
      for (const location of this.locationsData) {
        const data: Select2OptionData = {
          id: location.id.toString(),
          text: location.name
        };
        array.push(data);
      }
      return array;
    })
      .catch( error => {
        this.alertService.error('Error al Obtener los Inventarios', false);
        return array;
      });
  }

  locationChanged(data: { value: string }) {
    this.f.location.setValue(data.value);
  }

  addGeneralDevice() {
    localStorage.setItem('modal', 'true');
    const modalRef: NgbModalRef = this.modalService.open(GeneralDeviceFormComponent, { centered: true });
    modalRef.componentInstance.isClient = true;
    modalRef.result.then(() => {
      localStorage.removeDevice('modal');
    }, () => {
      this.isLoading = true;
      this.getSelectGeneralDevice().then(() => {
        this.isLoading = false;
      });
    });
  }

  addMaker() {
    localStorage.setItem('modal', 'true');
    const modalRef: NgbModalRef = this.modalService.open(MakerFormComponent, { centered: true });
    modalRef.componentInstance.isClient = true;
    modalRef.result.then(() => {
      localStorage.removeItem('modal');
    }, () => {
      this.isLoading = true;
      this.getSelectMakers().then(() => {
        this.isLoading = false;
      });
    });
  }

  addBrand() {
    localStorage.setItem('modal', 'true');
    const modalRef: NgbModalRef = this.modalService.open(BrandFormComponent, { centered: true });
    modalRef.componentInstance.isClient = true;
    modalRef.result.then(() => {
      localStorage.removeItem('modal');
    }, () => {
      this.isLoading = true;
      this.getSelectBrands().then(() => {
        this.isLoading = false;
      });
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.deviceForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.alertService.clear();
    this.buttonDisabled = true;
    if (!this.deviceId) {
      const body: PostDevice = {
        serial_code: this.deviceForm.value.serial_code,
        power_supply: this.deviceForm.value.power_supply,
        date: this.deviceForm.value.date,
        warranty_date: this.deviceForm.value.warranty_date,
        production_year: this.deviceForm.value.production_year,
        generalDevice: Number(this.deviceForm.value.generalDevice),
        maker: Number(this.deviceForm.value.maker),
        brand: Number(this.deviceForm.value.brand),
        location: Number(this.deviceForm.value.location)
      };
      console.log(body);
      this.service.postDevice(body)
        .subscribe(response => {
          this.router.navigate(['/devices']).then(result =>
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El Equipo Médico se ha Agregado Exitosamente',
              showConfirmButton: false,
              timer: 1500
            })
          );
        }, error => {
          this.isLoading = false;
          this.buttonDisabled = false;
          this.alertService.error('Error al Agregar el Equipo Médico', false);
        });
    } else {
      const body: UpdateDevice = {
        serial_code: this.deviceForm.value.serial_code,
        power_supply: this.deviceForm.value.power_supply,
        date: this.deviceForm.value.date,
        warranty_date: this.deviceForm.value.warranty_date,
        production_year: this.deviceForm.value.production_year,
        generalDevice: Number(this.deviceForm.value.generalDevice),
        maker: Number(this.deviceForm.value.maker),
        brand: Number(this.deviceForm.value.brand)
      };
      this.service.updateDevice(body, this.deviceId)
        .subscribe(response => {
          this.router.navigate(['/devices']).then(result =>
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El Equipo Médico se ha Editado Exitosamente',
              showConfirmButton: false,
              timer: 1500
            })
          );
        }, error => {
          this.isLoading = false;
          this.buttonDisabled = false;
          this.alertService.error('Error al Editar el Equipo Médico', false);
        });
    }
  }

}
