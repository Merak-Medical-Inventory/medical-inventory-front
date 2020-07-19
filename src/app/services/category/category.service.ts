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
    return this.http.get(`${environment.baseUrl}category`, {observe: 'response'});
  }

  getCategoryById(id: number) {
    return this.http.get(`${environment.baseUrl}category/${id}`, {observe: 'response'});
  }

  postCategory(body: PostCategory) {
    return this.http.post(`${environment.baseUrl}category`, body, {observe: 'response'});
  }

  updateCategory(body: PostCategory, id: number) {
    return this.http.put(`${environment.baseUrl}category/${id}`, {observe: 'response'});
  }

  deleteCategory(id: number) {
    return this.http.delete(`${environment.baseUrl}category/${id}`, {observe: 'response'});
  }
}
