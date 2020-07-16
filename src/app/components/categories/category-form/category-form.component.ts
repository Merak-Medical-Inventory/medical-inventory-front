import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {PostCategory} from '../../../entities/category';
import {CategoryService} from '../../../services/category/category.service';
import {Router} from '@angular/router';

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

  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit() {
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
    this.categoryService.postCategory(body)
      .subscribe( response => {
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
        Swal.fire({
          icon: 'error',
          title: 'Error al Agregar Categoría',
          text: 'Intente Nuevamente',
          confirmButtonColor: '#1ab394'
        });
      });
  }

}
