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
    return this.http.get(`${environment.authServiceUrl}department`, {observe: 'response'});
  }

  getDepartmentById(id: number) {
    return this.http.get(`${environment.authServiceUrl}department/${id}`, {observe: 'response'});
  }

  postDepartment(body: PostDepartment) {
    return this.http.post(`${environment.authServiceUrl}department`, body, {observe: 'response'});
  }

  updateDepartment(body: PostDepartment, id: number) {
    return this.http.put(`${environment.authServiceUrl}department/${id}`, body,{observe: 'response'});
  }

  deleteDepartment(id: number) {
    return this.http.delete(`${environment.authServiceUrl}department/${id}`, {observe: 'response'});
  }
}
