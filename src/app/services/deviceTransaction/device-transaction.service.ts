import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeviceTransactionService {

  constructor(private http: HttpClient) { }

  getTransactions() {
    return this.http.get(`${environment.deviceServiceUrl}transaction`, {observe: 'response'});
  }

  getInventoryTransactions(id: number) {
    return this.http.get(`${environment.deviceServiceUrl}transaction/inventory/${id}`, {observe: 'response'});
  }
}
