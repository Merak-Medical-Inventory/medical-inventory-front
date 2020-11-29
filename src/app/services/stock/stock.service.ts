import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OutputItemStock, UpdateStock} from '../../entities/inventory';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) { }

  putStock(body: UpdateStock, id: number) {
    return this.http.put(`${environment.inventoryServiceUrl}stock/${id}`, body, {observe: 'response'});
  }

  outputItemStock(body: OutputItemStock, id: number) {
    return this.http.put(`${environment.inventoryServiceUrl}stock/output/${id}`, body, {observe: 'response'});
  }
}
