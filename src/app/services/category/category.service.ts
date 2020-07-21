import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {PostCategory} from '../../entities/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get(`${environment.inventoryServiceUrl}category`, {observe: 'response'});
  }

  getCategoryById(id: number) {
    return this.http.get(`${environment.inventoryServiceUrl}category/${id}`, {observe: 'response'});
  }

  postCategory(body: PostCategory) {
    return this.http.post(`${environment.inventoryServiceUrl}category`, body, {observe: 'response'});
  }

  updateCategory(body: PostCategory, id: number) {
    return this.http.put(`${environment.inventoryServiceUrl}category/${id}`, body, {observe: 'response'});
  }

  deleteCategory(id: number) {
    return this.http.delete(`${environment.inventoryServiceUrl}category/${id}`, {observe: 'response'});
  }
}
