import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  getTransactions() {
    return this.http.get(`${environment.inventoryServiceUrl}transaction`, {observe: 'response'});
  }

  getInventoryTransactions(id: number) {
    return this.http.get(`${environment.inventoryServiceUrl}transaction/inventory/${id}`, {observe: 'response'});
  }

  getBlockchainTransaction(id: string) {
    return this.http.get(`${environment.inventoryServiceUrl}transaction/${id}`, {observe: 'response'});
  }
}
