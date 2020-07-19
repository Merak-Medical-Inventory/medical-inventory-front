import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {PostDepartment} from '../../entities/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }

  getDepartments() {
    return this.http.get(`${environment.baseUrl}department`, {observe: 'response'});
  }

  getDepartmentById(id: number) {
    return this.http.get(`${environment.baseUrl}department/${id}`, {observe: 'response'});
  }

  postDepartment(body: PostDepartment) {
    return this.http.post(`${environment.baseUrl}department`, body, {observe: 'response'});
  }

  updateDepartment(body: PostDepartment, id: number) {
    return this.http.put(`${environment.baseUrl}department/${id}`, {observe: 'response'});
  }

  deleteDepartment(id: number) {
    return this.http.delete(`${environment.baseUrl}department/${id}`, {observe: 'response'});
  }
}
