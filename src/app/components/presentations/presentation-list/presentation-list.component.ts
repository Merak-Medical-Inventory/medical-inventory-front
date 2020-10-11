import { Component, OnInit } from '@angular/core';
import { Presentation } from '../../../entities/presentation';
import { PresentationService} from '../../../services/presentation/presentation.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {AlertService} from '../../../services/alert/alert.service';
import {filterTable, paginateObject} from '../../../util';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-presentation-list',
  templateUrl: './presentation-list.component.html',
  styleUrls: ['./presentation-list.component.css']
})
export class PresentationListComponent implements OnInit {
  presentations: Presentation[] = [];
  currentPagePresentation: Presentation[];
  paginatedPresentation: Presentation[][] = [];
  search = '';
  isLoading = true;
  pageSize = 10;

  constructor(private service: PresentationService, private alertService: AlertService, private router: Router) { }

  ngOnInit() {
    this.service.getPresentations()
      .subscribe(response => {
        this.isLoading = false;
        this.presentations = response.body['data'];
        this.paginatedPresentation = paginateObject<Presentation>(this.presentations, this.pageSize);
        this.currentPagePresentation = this.paginatedPresentation[0];
      }, error => {
        this.isLoading = false;
        console.log(error.error);
        this.alertService.error('Error al Obtener la Información de las Presentaciones', false);
      });
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  onPageChanged(event: PageEvent) {
    this.currentPagePresentation = this.paginatedPresentation[event.pageIndex];
  }

  searchTyped() {
    this.paginatedPresentation = paginateObject<Presentation>(filterTable<Presentation>(this.presentations, this.search), this.pageSize);
    this.currentPagePresentation = this.paginatedPresentation[0];
  }

  onDelete(id: number) {
    this.alertService.clear();
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
        this.isLoading = true;
        this.service.deletePresentation(id)
          .subscribe(response => {
            this.isLoading = false;
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
            this.alertService.error('Error al Eliminar la Presentación', false);
          });
      }
    });
  }

}
