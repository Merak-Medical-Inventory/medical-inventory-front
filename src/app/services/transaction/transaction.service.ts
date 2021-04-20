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

  getTransactionById(id: number) {
    return this.http.get(`${environment.inventoryServiceUrl}transaction/${id}`, {observe: 'response'});
  }
}
