import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Maker, PostMaker} from '../../../entities/Maker';
import {MakerService} from '../../../services/maker/maker.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../../services/alert/alert.service';

@Component({
  selector: 'app-maker-form',
  templateUrl: './Maker-form.component.html',
  styleUrls: ['./Maker-form.component.css']
})
export class MakerFormComponent implements OnInit {
  makerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    address: new FormControl('', [Validators.required, Validators.maxLength(40)]),
    phone_number:  new FormControl('', [Validators.required, Validators.pattern('[0-9]{2}-[0-9]{3}-[0-9]{3}-[0-9]{4}')]),
  });
  makerId: number;
  submitted = false;
  buttonDisabled = false;
  isLoading = true;
  maker: Maker;

  constructor(private service: MakerService, private alertService: AlertService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.isLoading = false;
    this.route.params.subscribe(params => {
      this.makerId = parseInt(params.makerId, 0);
    });
    if (this.makerId) {
        this.service.getMakerById(this.makerId).subscribe(response => {
          this.maker = response.body['data'];
          console.log(response);
          this.f.name.setValue(this.maker.name);
          this.f.address.setValue(this.maker.address);
          this.f.phone_number.setValue(this.maker.phone_number);
        });
        this.isLoading = false;
    }
  }

  get f() {
    return this.makerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.makerForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.alertService.clear();
    this.buttonDisabled = true;
    const body: PostMaker = {
      name: this.makerForm.value.name,
      address: this.makerForm.value.address,
      phone_number: this.makerForm.value.phone_number
    };
    console.log(body);
    if (!this.makerId) {
      this.service.postMaker(body)
        .subscribe(response => {
          this.router.navigate(['/makers']).then(result =>
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El Fabricante se ha Registrado Exitosamente',
              showConfirmButton: false,
              timer: 1500
            })
          );
        }, error => {
          this.isLoading = false;
          this.buttonDisabled = false;
          this.alertService.error('Error al Registrar el Fabricante', false);
        });
    } else {
      this.service.updateMaker(body, this.makerId)
        .subscribe(response => {
          this.router.navigate(['/makers']).then(result =>
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El Fabricante se ha Editado Exitosamente',
              showConfirmButton: false,
              timer: 1500
            })
          );
        }, error => {
          this.isLoading = false;
          this.buttonDisabled = false;
          this.alertService.error('Error al Editar el Fabricante', false);
        });
    }
  }

}
