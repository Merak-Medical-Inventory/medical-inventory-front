import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {PostOrder, UpdateOrder} from '../../entities/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrders() {
    return this.http.get(`${environment.inventoryServiceUrl}order`, {observe: 'response'});
  }

  getOrderById(id: number) {
    return this.http.get(`${environment.inventoryServiceUrl}order/${id}`, {observe: 'response'});
  }

  postOrder(body: PostOrder) {
    return this.http.post(`${environment.inventoryServiceUrl}order`, body, {observe: 'response'});
  }

  updateOrder(body: UpdateOrder, id: number) {
    return this.http.put(`${environment.inventoryServiceUrl}order/${id}`, body, {observe: 'response'});
  }

}
