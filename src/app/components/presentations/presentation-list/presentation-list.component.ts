import { Component, OnInit } from '@angular/core';
import { Presentation } from '../../../entities/presentation';
import { PresentationService} from '../../../services/presentation/presentation.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-presentation-list',
  templateUrl: './presentation-list.component.html',
  styleUrls: ['./presentation-list.component.css']
})
export class PresentationListComponent implements OnInit {
  presentations: Presentation[] = [];
  search = '';
  isLoading = true;

  constructor(private service: PresentationService, private router: Router) { }

  ngOnInit() {
    this.service.getPresentations()
      .subscribe(response => {
        this.isLoading = false;
        this.presentations = response.body['data'];
      }, error => {
        this.isLoading = false;
        console.log(error.error);
        Swal.fire({
          icon: 'error',
          title: 'Error al Obtener la Información de las Presentaciones',
          text: 'Intente más Tarde',
          confirmButtonColor: '#1ab394'
        });
      });
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Desea Eliminar el Presentación?',
      // text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.service.deletePresentation(id)
          .subscribe(response => {
            this.reloadCurrentRoute();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'La Presentación se ha Eliminado Exitosamente',
              showConfirmButton: false,
              timer: 1500
            });
          }, error => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Error al Eliminar la Presentación',
              text: 'Intente Nuevamente',
              confirmButtonColor: '#1ab394'
            });
          });
      }
    });
  }

}
