import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {PostProvider} from '../../entities/Provider';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private http: HttpClient) { }

  getProviders() {
    return this.http.get(`${environment.inventoryServiceUrl}provider`, {observe: 'response'});
  }

  getProviderById(id: number) {
    return this.http.get(`${environment.inventoryServiceUrl}provider/${id}`, {observe: 'response'});
  }

  postProvider(body: PostProvider) {
    return this.http.post(`${environment.inventoryServiceUrl}provider`, body, {observe: 'response'});
  }

  updateProvider(body: PostProvider, id: number) {
    return this.http.put(`${environment.inventoryServiceUrl}provider/${id}`, body, {observe: 'response'});
  }

  deleteProvider(id: number) {
    return this.http.delete(`${environment.inventoryServiceUrl}provider/${id}`, {observe: 'response'});
  }
}
