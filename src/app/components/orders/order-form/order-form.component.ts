import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Options} from 'select2';
import {Select2OptionData} from 'ng-select2';
import {SelectComponent} from 'ng2-select';
import {PostOrder, PostItemOrder} from '../../../entities/order';
import {OrderService} from '../../../services/order/order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../../services/alert/alert.service';
import {Provider} from '../../../entities/provider';
import {ProviderService} from '../../../services/provider/provider.service';
import {Item} from '../../../entities/item';
import { User } from 'src/app/entities/user';
import { NgxSelectModule, INgxSelectOptions } from 'ngx-select-ex';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  orderForm = new FormGroup({
    provider: new FormControl('', [Validators.required]),
    items: new FormControl('', [Validators.required])
  });
  user: User;
  providerOptions: Options;
  providers: Select2OptionData[] = [];
  providersData: Provider[] = [];
  itemOptions: Options;
  items: Array<any> = [];
  itemsData: any[] = [];
  itemsOrder: PostItemOrder[] = [];
  submitted = false;
  buttonDisabled = false;
  isLoading = true;

  constructor(private service: OrderService, private providerService: ProviderService,
              private alertService: AlertService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.providerOptions = {
      width: '100%',
      placeholder: {id: '', text: 'Seleccione el Proveedor...'}
    };
    this.itemOptions = {
      multiple: true,
      width: '100%',
      placeholder: {id: '', text: 'Seleccione los Insumos...'}
    };
    this.getSelectProvider().then(() => {
      this.isLoading = false;
    });
  }

  get f() {
    return this.orderForm.controls;
  }

  async getSelectProvider() {
    this.alertService.clear();
    const array: Select2OptionData[] = [];
    this.providers = await this.providerService.getProviders().toPromise().then(value => {
      this.providersData = value.body['data'];
      for (const provider of this.providersData) {
        const data: Select2OptionData = {
          id: provider.id.toString(),
          text: provider.name + ' ' + provider.last_name 
        };
        array.push(data);
      }
      return array;
    })
      .catch( error => {
        this.isLoading = false;
        this.alertService.error('Error al Obtener los Proveedores', false);
        return array;
      });
  }

  providerChanged(data: { value: string }){
    if (data[0] != null){
      this.isLoading = true;
      this.providerService.getProviderById(Number(data[0]))
      .subscribe(response => {
        const prov: Provider = response.body['data'];
        this.getSelectItem(prov.items).then(() => {
          console.log(this.itemsData);
          this.isLoading = false;
        });  
      }); 
    }
    this.f.provider.setValue(data.value);   
  }

  async getSelectItem(items: Item[]) {
    this.alertService.clear();
    const array: any[] = [];
    for (const item of items) {
      const data: any = {
        id: item.id.toString(),
        text: item.generalItem.name + ' ' +  item.brand.name + ' ' + item.presentation.quantity + ' ' + item.presentation.name + ' ' +
        item.presentation.measure_value + ' ' + item.presentation.measure
      };
      array.push(data);
    }
    this.itemsData = [...array];
  }

  async itemAdd(value: any) {
    const itemText = this.itemsData.filter(function(item){
      return item.id == Number(value);
    })
    const {value: units} = await Swal.fire({
      title: 'Cuál es la Cantidad de ' + itemText[0].text + ' a Solicitar?',
      icon: 'question',
      input: 'range',
      inputAttributes: {
          min: '1',
          step: '1'
      },
      inputValue: '1'
   });
   if (units) {
    const itemOrder: PostItemOrder = {
      id: Number(value),
      amount: Number(units)
    }
    this.itemsOrder.push(itemOrder); 
    this.f.items.setValue(this.itemsOrder.map(i => i.id)
    .map(value => value.toString()));
   } 
  }

  itemRemoved(value: any) {
    this.itemsOrder = this.itemsOrder.filter(function(item){
      return item.id != Number(value);
    })
    this.f.items.setValue(this.itemsOrder.map(i => i.id)
    .map(value => value.toString()));
  }

  onSubmit() {
    this.submitted = true;
    if (this.orderForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.alertService.clear();
    this.buttonDisabled = true;
    this.user = JSON.parse(localStorage.getItem('User') );
    const body: PostOrder = {
      user: this.user.id,
      provider: Number(this.orderForm.value.provider),
      items: this.itemsOrder
    };
    console.log(body);
    this.service.postOrder(body)
    .subscribe(response => {
      this.router.navigate(['/orders']).then(result =>
      Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'El Pedido se ha Registrado Exitosamente',
          showConfirmButton: false,
          timer: 1500
        })
      );
    }, error => {
      this.isLoading = false;
      this.buttonDisabled = false;
      this.alertService.error('Error al Registrar el Pedido', false);
    });
  }
}
