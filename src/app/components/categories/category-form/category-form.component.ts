import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  categoryForm = new FormGroup({
    name : new FormControl('', [Validators.required, Validators.maxLength(20)]),
    description : new FormControl('', [Validators.required, Validators.maxLength(20)])
  });
  edit = false;
  categoryId: number;
  submitted = false;
  buttonDisabled = false;
  isLoading = true;

  constructor() { }

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
  }

}
