import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) { }

  getInventoryById(id: number) {
    return this.http.get(`${environment.inventoryServiceUrl}inventory/${id}`, {observe: 'response'});
  }

}
