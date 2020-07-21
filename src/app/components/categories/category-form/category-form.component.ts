import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Category, PostCategory} from '../../../entities/category';
import {CategoryService} from '../../../services/category/category.service';
import {ActivatedRoute, Router} from '@angular/router';

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

  constructor(private service: CategoryService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
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
    this.buttonDisabled = true;
    const body: PostCategory = {
      name: this.categoryForm.value.name,
      description: this.categoryForm.value.description
    };
    console.log(body);
    if (!this.categoryId) {
      this.service.postCategory(body)
        .subscribe(response => {
          this.router.navigate(['/categories']).then(result =>
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'La Categoría se ha Agregado Exitosamente',
              showConfirmButton: false,
              timer: 1500
            })
          );
        }, error => {
          this.buttonDisabled = false;
          Swal.fire({
            icon: 'error',
            title: 'Error al Agregar Categoría',
            text: 'Intente Nuevamente',
            confirmButtonColor: '#1ab394'
          });
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
          this.buttonDisabled = false;
          Swal.fire({
            icon: 'error',
            title: 'Error al Editar la Categoría',
            text: 'Intente Nuevamente',
            confirmButtonColor: '#1ab394'
          });
        });
    }
  }

}
