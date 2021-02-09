import { Component, OnInit } from '@angular/core';
import {Maker} from '../../../entities/Maker';
import {MakerService} from '../../../services/maker/maker.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {AlertService} from '../../../services/alert/alert.service';
import {filterTable, paginateObject} from '../../../util';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-maker-list',
  templateUrl: './maker-list.component.html',
  styleUrls: ['./maker-list.component.css']
})
export class MakerListComponent implements OnInit {
  makers: Maker[] = [];
  currentPageMaker: Maker[];
  paginatedMaker: Maker[][] = [];
  search = '';
  isLoading = true;
  pageSize = 10;

  constructor(private service: MakerService, private router: Router, private alertService: AlertService) { }

  ngOnInit() {
    this.service.getMakers()
      .subscribe(response => {
        this.isLoading = false;
        this.makers = response.body['data'];
        this.paginatedMaker = paginateObject<Maker>(this.makers, this.pageSize);
        this.currentPageMaker = this.paginatedMaker[0];
      }, error => {
        this.isLoading = false;
        console.log(error.error);
        this.alertService.error('Error al Obtener las Marcas', false);
      });
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  onPageChanged(event: PageEvent) {
    this.currentPageMaker = this.paginatedMaker[event.pageIndex];
  }

  searchTyped() {
    this.paginatedMaker = paginateObject<Maker>(filterTable<Maker>(this.makers, this.search), this.pageSize);
    this.currentPageMaker = this.paginatedMaker[0];
  }

  onDelete(id: number) {
    this.alertService.clear();
    Swal.fire({
      title: 'Desea Eliminar el Fabricante?',
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
        this.service.deleteMaker(id)
          .subscribe(response => {
            this.isLoading = false;
            this.reloadCurrentRoute();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El Fabricante se ha Eliminado Exitosamente',
              showConfirmButton: false,
              timer: 1500
            });
          }, error => {
            console.log(error);
            this.alertService.error('Error al Eliminar la Marca', false);
          });
      }
    });
  }

}
