import { Component, OnInit, Input } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Options} from 'select2';
import {Select2OptionData} from 'ng-select2';
import {Inventory} from '../../../entities/inventory';
import {InventoryService} from '../../../services/inventory/inventory.service';
import {AlertService} from '../../../services/alert/alert.service';
import {DeviceTable} from '../../../entities/device';

@Component({
  selector: 'app-update-location',
  templateUrl: './update-location.component.html',
  styleUrls: ['./update-location.component.css']
})
export class UpdateLocationComponent implements OnInit {
  locationForm = new FormGroup({
    location: new FormControl('')
  });
  @Input() device: DeviceTable;
  submitted = false;
  isLoading = true;
  location: number;
  locationOptions: Options;
  locations: any[] = [];
  locationsData: Inventory[] = [];

  constructor(private activeModal: NgbActiveModal, private locationService: InventoryService, private alertService: AlertService) { }

  ngOnInit() {
    this.locationOptions = {
      width: '100%',
      placeholder: {id: '', text: 'Seleccione la Ubicación...'}
    };
    this.getSelectLocations().then(() => {
      this.f.location.setValue(String(this.device.locationId));
      console.log(this.locations);
    });
    this.isLoading = false;
    console.log(this.device);
  }

  get f() {
    return this.locationForm.controls;
  }

  get deviceName() {
    return this.device.generalDevice + ' ' + this.device.serial_code;
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

  locationChanged(data: any) {
    console.log(data);
    this.f.location.setValue(data);
  }

  onSubmit() {
    this.location = this.locationForm.value.location;
    this.activeModal.close(this.location);
  }

}
