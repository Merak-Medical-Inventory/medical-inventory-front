import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UpdateStock} from '../../entities/inventory';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) { }

  putStock(body: UpdateStock, id: number) {
    return this.http.put(`${environment.inventoryServiceUrl}stock/${id}`, body, {observe: 'response'});
  }
}
