import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Brand, PostBrand} from '../../../entities/brand';
import {BrandService} from '../../../services/brand/brand.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.css']
})
export class BrandFormComponent implements OnInit {
  brandForm = new FormGroup({
    name : new FormControl('', [Validators.required, Validators.maxLength(20)]),
    description : new FormControl('', [Validators.required, Validators.maxLength(40)])
  });
  edit = false;
  brandId: number;
  submitted = false;
  buttonDisabled = false;
  isLoading = true;
  brand: Brand;
  modal = false;

  constructor(private service: BrandService, private modalService: NgbModal,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.modal = Boolean(localStorage.getItem('modal'));
    this.route.params.subscribe(params => {
      this.brandId = parseInt(params.brandId, 0);
    });
    if (this.brandId) {
      this.service.getBrandById(this.brandId).subscribe(response => {
        this.brand = response.body['data'];
        console.log(response);
        this.f.name.setValue(this.brand.name);
        this.f.description.setValue(this.brand.description);
      });
    }
    this.isLoading = false;
  }

  get f() {
    return this.brandForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.brandForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.buttonDisabled = true;
    const body: PostBrand = {
      name: this.brandForm.value.name,
      description: this.brandForm.value.description
    };
    console.log(body);
    if (!this.brandId) {
      this.service.postBrand(body)
        .subscribe(response => {
          if (!this.modal) {
            this.router.navigate(['/brands']).then(result =>
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'La Marca se ha Agregado Exitosamente',
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
              title: 'La Marca se ha Agregado Exitosamente',
              showConfirmButton: false,
              timer: 1500
            });
          }
        }, error => {
          this.isLoading = false;
          this.buttonDisabled = false;
          Swal.fire({
            icon: 'error',
            title: 'Error al Agregar la Marca',
            text: 'Intente Nuevamente',
            confirmButtonColor: '#1ab394'
          });
        });
    } else {
      this.service.updateBrand(body, this.brandId)
        .subscribe(response => {
          this.router.navigate(['/brands']).then(result =>
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'La Marca se ha Editado Exitosamente',
              showConfirmButton: false,
              timer: 1500
            })
          );
        }, error => {
          this.isLoading = false;
          this.buttonDisabled = false;
          Swal.fire({
            icon: 'error',
            title: 'Error al Editar la Marca',
            text: 'Intente Nuevamente',
            confirmButtonColor: '#1ab394'
          });
        });
    }
  }

}
