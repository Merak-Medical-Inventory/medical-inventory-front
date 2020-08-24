import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {GeneralItem, PostGeneralItem} from '../../../entities/GeneralItem';
import {GeneralItemService} from '../../../services/generalItem/general-item.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AlertService} from '../../../services/alert/alert.service';

@Component({
  selector: 'app-general-item-form',
  templateUrl: './general-item-form.component.html',
  styleUrls: ['./general-item-form.component.css']
})
export class GeneralItemFormComponent implements OnInit {
  generalItemForm = new FormGroup({
    name : new FormControl('', [Validators.required, Validators.maxLength(20)]),
    description : new FormControl('', [Validators.required, Validators.maxLength(40)])
  });
  edit = false;
  generalItemId: number;
  submitted = false;
  buttonDisabled = false;
  isLoading = true;
  generalItem: GeneralItem;
  modal = false;

  constructor(private service: GeneralItemService, private modalService: NgbModal,
              private router: Router, private route: ActivatedRoute, private alertService: AlertService) { }

  ngOnInit() {
    this.modal = Boolean(localStorage.getItem('modal'));
    this.route.params.subscribe(params => {
      this.generalItemId = parseInt(params.generalItemId, 0);
    });
    if (this.generalItemId) {
      this.service.getGeneralItemById(this.generalItemId).subscribe(response => {
        console.log(response);
        this.generalItem = response.body['data'];
        this.f.name.setValue(this.generalItem.name);
        this.f.description.setValue(this.generalItem.description);
      });
    }
    this.isLoading = false;
  }

  get f() {
    return this.generalItemForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.generalItemForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.alertService.clear();
    this.buttonDisabled = true;
    const body: PostGeneralItem = {
      name: this.generalItemForm.value.name,
      description: this.generalItemForm.value.description
    };
    console.log(body);
    if (!this.generalItemId) {
      this.service.postGeneralItem(body)
        .subscribe(response => {
          if (!this.modal) {
            this.router.navigate(['/generalItems']).then(result =>
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'El Insumo General se ha Agregado Exitosamente',
                showConfirmButton: false,
                timer: 1500
              })
            );
          } else {
            localStorage.removeItem('modal');
            this.modalService.dismissAll();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El Insumo General se ha Agregado Exitosamente',
              showConfirmButton: false,
              timer: 1500
            });
          }
        }, error => {
          this.isLoading = false;
          this.buttonDisabled = false;
          this.alertService.error('Error al Agregar El Insumo General', false);
        });
    } else {
      this.service.updateGeneralItem(body, this.generalItemId)
        .subscribe(response => {
          this.router.navigate(['/generalItems']).then(result =>
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El Insumo General se ha Agregado Exitosamente',
              showConfirmButton: false,
              timer: 1500
            })
          );
        }, error => {
          this.isLoading = false;
          this.buttonDisabled = false;
          this.alertService.error('Error al Editar el Insumo General', false);
        });
    }
  }

}
