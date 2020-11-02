import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Options} from 'select2';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../../services/alert/alert.service';
import {User} from '../../../entities/user';
import {Select2OptionData} from 'ng-select2';
import {PostItemOrder} from '../../../entities/order';
import {Item} from '../../../entities/item';
import {OrderDepartmentService} from '../../../services/orderDepartment/order-department.service';
import {ItemService} from '../../../services/item/item.service';
import {PostOrderDepartment} from '../../../entities/orderDepartment';


@Component({
  selector: 'app-order-department-form',
  templateUrl: './order-department-form.component.html',
  styleUrls: ['./order-department-form.component.css']
})
export class OrderDepartmentFormComponent implements OnInit {
  orderForm = new FormGroup({
    items: new FormControl('', [Validators.required])
  });
  user: User;
  itemOptions: Options;
  items: Array<any> = [];
  itemsData: any[] = [];
  itemsOrder: PostItemOrder[] = [];
  submitted = false;
  buttonDisabled = false;
  isLoading = true;

  constructor(private service: OrderDepartmentService, private itemService: ItemService,
              private alertService: AlertService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.itemOptions = {
      multiple: true,
      width: '100%',
      placeholder: {id: '', text: 'Seleccione los Insumos...'}
    };
    this.getSelectItem().then(() => {
      this.isLoading = false;
    });
  }

  get f() {
    return this.orderForm.controls;
  }

  async getSelectItem() {
    this.alertService.clear();
    this.itemService.getItems().subscribe(response => {
      const items: Item[] = response.body['data'];
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
    }, error => {
      this.isLoading = false;
      console.log(error.error);
      this.alertService.error('Error al Obtener los Insumos', false);
    });
  }

  async itemAdd(value: any) {
    console.log(value);
    console.log(this.itemsData);
    const itemText = this.itemsData.filter(function(item) {
      return item.id == Number(value);
    });
    console.log(itemText);
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
      };
      this.itemsOrder.push(itemOrder);
      this.f.items.setValue(this.itemsOrder.map(i => i.id)
        .map(value => value.toString()));
    } else {
      this.itemRemoved(value);
    }
  }

  itemRemoved(value: any) {
    this.itemsOrder = this.itemsOrder.filter(function(item){
      return item.id !== Number(value);
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
    const body: PostOrderDepartment = {
      transmitter: this.user.id,
      items: this.itemsOrder
    };
    console.log(body);
    this.service.postOrder(body)
      .subscribe(response => {
        this.router.navigate(['/orderDepartment']).then(result =>
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
