import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {PostOrderDepartment} from '../../entities/orderDepartment';

@Injectable({
  providedIn: 'root'
})
export class OrderDepartmentService {

  constructor(private http: HttpClient) { }

  getOrders() {
    return this.http.get(`${environment.inventoryServiceUrl}orderDepartment`, {observe: 'response'});
  }

  getOrderDepartment(id: number) {
    return this.http.get(`${environment.inventoryServiceUrl}orderDepartment/department/${id}`, {observe: 'response'});
  }

  postOrder(body: PostOrderDepartment) {
    return this.http.post(`${environment.inventoryServiceUrl}orderDepartment`, body, {observe: 'response'});
  }
}
