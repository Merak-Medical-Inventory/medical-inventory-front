import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AcceptOrderDepartment, DeniedOrderDepartment, PostOrderDepartment} from '../../entities/orderDepartment';

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

  getStockForOrder(id: number) {
    return this.http.get(`${environment.inventoryServiceUrl}orderDepartment/stock/${id}`, {observe: 'response'});
  }

  deniedOrderDepartment(body: DeniedOrderDepartment, id: number) {
    return this.http.put(`${environment.inventoryServiceUrl}orderDepartment/${id}`, body, {observe: 'response'});
  }

  acceptOrderDepartment(body: AcceptOrderDepartment, id: number) {
    return this.http.post(`${environment.inventoryServiceUrl}orderDepartment/department/${id}/accept`, body, {observe: 'response'});
  }
}
