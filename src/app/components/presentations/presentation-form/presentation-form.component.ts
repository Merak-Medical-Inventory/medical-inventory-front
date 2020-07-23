import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PresentationService} from '../../../services/presentation/presentation.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {Presentation, PostPresentation} from '../../../entities/presentation';

@Component({
  selector: 'app-presentation-form',
  templateUrl: './presentation-form.component.html',
  styleUrls: ['./presentation-form.component.css']
})
export class PresentationFormComponent implements OnInit {
  presentationForm = new FormGroup({
    name : new FormControl('', [Validators.required, Validators.maxLength(20)]),
    quantity : new FormControl('', [Validators.required]),
    measure : new FormControl('', [Validators.required, Validators.maxLength(20)]),
    measure_value : new FormControl('', [Validators.required])
  });
  edit = false;
  presentationId: number;
  presentation: Presentation;
  submitted = false;
  buttonDisabled = false;
  isLoading = true;
  constructor(private service: PresentationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.presentationId = parseInt(params.presentationId, 0);
    });
    if (this.presentationId) {
      this.service.getPresentationById(this.presentationId).subscribe(response => {
        this.presentation = response.body['data'];
        console.log(response);
        this.f.name.setValue(this.presentation.name);
        this.f.quantity.setValue(this.presentation.quantity);
        this.f.measure.setValue(this.presentation.measure);
        this.f.measure_value.setValue(this.presentation.measure_value);
      });
    }
    this.isLoading = false;
  }

  get f() {
    return this.presentationForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.presentationForm.invalid) {
      return;
    }
    this.buttonDisabled = true;
    const body: PostPresentation = {
      name: this.presentationForm.value.name,
      quantity: this.presentationForm.value.quantity,
      measure: this.presentationForm.value.measure,
      measure_value: this.presentationForm.value.measure_value
    };
    console.log(body);
    if (!this.presentationId) {
      this.service.postPresentation(body)
        .subscribe(response => {
          this.router.navigate(['/presentations']).then(result =>
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'La Presentación se ha Agregado Exitosamente',
              showConfirmButton: false,
              timer: 1500
            })
          );
        }, error => {
          Swal.fire({
            icon: 'error',
            title: 'Error al Agregar la Presentación',
            text: 'Intente Nuevamente',
            confirmButtonColor: '#1ab394'
          });
        });
    } else {
      this.service.updatePresentation(body, this.presentationId)
        .subscribe(response => {
          this.router.navigate(['/presentations']).then(result =>
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'La Presentación se ha Editado Exitosamente',
              showConfirmButton: false,
              timer: 1500
            })
          );
        }, error => {
          this.buttonDisabled = false;
          Swal.fire({
            icon: 'error',
            title: 'Error al Editar la Presentación',
            text: 'Intente Nuevamente',
            confirmButtonColor: '#1ab394'
          });
        });
    }
  }
}
