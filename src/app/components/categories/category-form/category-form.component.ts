import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Category, PostCategory} from '../../../entities/category';
import {CategoryService} from '../../../services/category/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AlertService} from '../../../services/alert/alert.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  categoryForm = new FormGroup({
    name : new FormControl('', [Validators.required, Validators.maxLength(20)]),
    description : new FormControl('', [Validators.required, Validators.maxLength(40)])
  });
  edit = false;
  categoryId: number;
  submitted = false;
  buttonDisabled = false;
  isLoading = true;
  category: Category;
  modal = false;

  constructor(private service: CategoryService, private modalService: NgbModal,
              private router: Router, private route: ActivatedRoute, private alertService: AlertService) { }

  ngOnInit() {
    this.modal = Boolean(localStorage.getItem('modal'));
    this.route.params.subscribe(params => {
      this.categoryId = parseInt(params.categoryId, 0);
    });
    if (this.categoryId) {
      this.service.getCategoryById(this.categoryId).subscribe(response => {
        this.category = response.body['data'];
        console.log(response);
        this.f.name.setValue(this.category.name);
        this.f.description.setValue(this.category.description);
      });
    }
    this.isLoading = false;
  }

  get f() {
    return this.categoryForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.categoryForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.alertService.clear();
    this.buttonDisabled = true;
    const body: PostCategory = {
      name: this.categoryForm.value.name,
      description: this.categoryForm.value.description
    };
    console.log(body);
    if (!this.categoryId) {
      this.service.postCategory(body)
        .subscribe(response => {
          if (!this.modal) {
            this.router.navigate(['/categories']).then(result =>
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'La Categoría se ha Agregado Exitosamente',
                showConfirmButton: false,
                timer: 1500
              })
            );
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'La Categoría se ha Agregado Exitosamente',
              showConfirmButton: false,
              timer: 1500
            });
            localStorage.removeItem('modal');
            this.modalService.dismissAll();
          }
        }, error => {
          this.isLoading = false;
          this.buttonDisabled = false;
          this.alertService.error('Error al Agregar la Categoría', false);
        });
    } else {
      this.service.updateCategory(body, this.categoryId)
        .subscribe(response => {
          this.router.navigate(['/categories']).then(result =>
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'La Categoría se ha Editado Exitosamente',
              showConfirmButton: false,
              timer: 1500
            })
          );
        }, error => {
          this.isLoading = false;
          this.buttonDisabled = false;
          this.alertService.error('Error al Editar la Categoría', false);
        });
    }
  }

}
