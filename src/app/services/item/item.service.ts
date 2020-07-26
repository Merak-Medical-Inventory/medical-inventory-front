import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {PostItem} from '../../entities/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  getItems() {
    return this.http.get(`${environment.inventoryServiceUrl}item`, {observe: 'response'});
  }

  getItemById(id: number) {
    return this.http.get(`${environment.inventoryServiceUrl}item/${id}`, {observe: 'response'});
  }

  postItem(body: PostItem) {
    return this.http.post(`${environment.inventoryServiceUrl}item`, body, {observe: 'response'});
  }

  updateItem(body: PostItem, id: number) {
    return this.http.put(`${environment.inventoryServiceUrl}item/${id}`, body, {observe: 'response'});
  }

  deleteItem(id: number) {
    return this.http.delete(`${environment.inventoryServiceUrl}item/${id}`, {observe: 'response'});
  }
}
