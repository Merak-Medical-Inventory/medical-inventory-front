import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Options} from 'select2';
import {Select2OptionData} from 'ng-select2';
import {Provider, PostProvider} from '../../../entities/provider';
import {ProviderService} from '../../../services/provider/provider.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../../services/alert/alert.service';
import {Item} from '../../../entities/item';
import {ItemService} from '../../../services/item/item.service';

@Component({
  selector: 'app-provider-form',
  templateUrl: './provider-form.component.html',
  styleUrls: ['./provider-form.component.css']
})
export class ProviderFormComponent implements OnInit {
  providerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    last_name:  new FormControl('', [Validators.required, Validators.maxLength(20)]),
    email: new FormControl("", [Validators.required, Validators.email, Validators.maxLength(20)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(40)]),
    company:  new FormControl('', [Validators.required, Validators.maxLength(20)]),
    country: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    city: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    address: new FormControl('', [Validators.required, Validators.maxLength(40)]),
    phone_number:  new FormControl('', [Validators.required, Validators.pattern('[0-9]{2}-[0-9]{3}-[0-9]{3}-[0-9]{4}')]),
    items: new FormControl('', [Validators.required])
  });
  itemOptions: Options;
  items: Select2OptionData[] = [];
  itemsData: Item[] = [];
  providerId: number;
  submitted = false;
  buttonDisabled = false;
  isLoading = true;
  provider: Provider;

  constructor(private service: ProviderService, private itemService: ItemService,
              private alertService: AlertService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.itemOptions = {
      multiple: true,
      width: '100%',
      placeholder: {id: '', text: 'Seleccione los Insumos...'}
    };
    this.route.params.subscribe(params => {
      this.providerId = parseInt(params.providerId, 0);
    });
    this.getSelectItem().then(() => {
      if (this.providerId) {
        this.service.getProviderById(this.providerId).subscribe(response => {
          this.provider = response.body['data'];
          console.log(response);
          this.f.name.setValue(this.provider.name);
          this.f.last_name.setValue(this.provider.last_name);
          this.f.email.setValue(this.provider.email);
          this.f.description.setValue(this.provider.description);
          this.f.company.setValue(this.provider.company);
          this.f.country.setValue(this.provider.country);
          this.f.city.setValue(this.provider.city);
          this.f.address.setValue(this.provider.address);
          this.f.phone_number.setValue(this.provider.phone_number);
          console.log(this.provider.items.map(i => i.id));
          this.f.items.setValue(this.provider.items.map(i => i.id).map(value => value.toString()));
        });
      }
      this.isLoading = false;
    });
  }

  get f() {
    return this.providerForm.controls;
  }

  async getSelectItem() {
    this.alertService.clear();
    const array: Select2OptionData[] = [];
    this.items = await this.itemService.getItems().toPromise().then(value => {
      this.itemsData = value.body['data'];
      for (const item of this.itemsData) {
        const data: Select2OptionData = {
          id: item.id.toString(),
          text: item.generalItem.name + ' ' +  item.brand.name + ' ' + item.presentation.quantity + ' ' + item.presentation.name + ' ' +
            item.presentation.measure_value + ' ' + item.presentation.measure
        };
        array.push(data);
      }
      return array;
    })
      .catch( error => {
        this.alertService.error('Error al Obtener los Insumos', false);
        return array;
      });
  }

  itemsChanged(data: { value: string[] }) {
    this.f.items.setValue(data.value);
  }

  onSubmit() {
    this.submitted = true;
    if (this.providerForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.alertService.clear();
    this.buttonDisabled = true;
    const body: PostProvider = {
      name: this.providerForm.value.name,
      last_name: this.providerForm.value.last_name,
      email: this.providerForm.value.email,
      description: this.providerForm.value.description,
      company: this.providerForm.value.company,
      country: this.providerForm.value.country,
      city: this.providerForm.value.city,
      address: this.providerForm.value.address,
      phone_number: this.providerForm.value.phone_number,
      items: this.providerForm.value.items.map(Number)
    };
    console.log(body);
    if (!this.providerId) {
      this.service.postProvider(body)
        .subscribe(response => {
          this.router.navigate(['/providers']).then(result =>
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El Proveedor se ha Registrado Exitosamente',
              showConfirmButton: false,
              timer: 1500
            })
          );
        }, error => {
          this.isLoading = false;
          this.buttonDisabled = false;
          this.alertService.error('Error al Registrar el Proveedor', false);
        });
    } else {
      this.service.updateProvider(body, this.providerId)
        .subscribe(response => {
          this.router.navigate(['/providers']).then(result =>
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El Proveedor se ha Editado Exitosamente',
              showConfirmButton: false,
              timer: 1500
            })
          );
        }, error => {
          this.isLoading = false;
          this.buttonDisabled = false;
          this.alertService.error('Error al Editar el Proveedor', false);
        });
    }
  }

}
