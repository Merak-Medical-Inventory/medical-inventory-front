import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {PostGeneralItem} from '../../entities/GeneralItem';

@Injectable({
  providedIn: 'root'
})
export class GeneralItemService {

  constructor(private http: HttpClient) { }

  getGeneralItems() {
    return this.http.get(`${environment.inventoryServiceUrl}generalItem`, {observe: 'response'});
  }

  getGeneralItemById(id: number) {
    return this.http.get(`${environment.inventoryServiceUrl}generalItem/${id}`, {observe: 'response'});
  }

  postGeneralItem(body: PostGeneralItem) {
    return this.http.post(`${environment.inventoryServiceUrl}generalItem`, body, {observe: 'response'});
  }

  updateGeneralItem(body: PostGeneralItem, id: number) {
    return this.http.put(`${environment.inventoryServiceUrl}generalItem/${id}`, body, {observe: 'response'});
  }

  deleteGeneralItem(id: number) {
    return this.http.delete(`${environment.inventoryServiceUrl}generalItem/${id}`, {observe: 'response'});
  }
}
