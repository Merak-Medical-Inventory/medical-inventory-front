import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {PostBrand} from '../../entities/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) { }

  getBrands() {
    return this.http.get(`${environment.inventoryServiceUrl}brand`, {observe: 'response'});
  }

  getBrandById(id: number) {
    return this.http.get(`${environment.inventoryServiceUrl}brand/${id}`, {observe: 'response'});
  }

  postBrand(body: PostBrand) {
    return this.http.post(`${environment.inventoryServiceUrl}brand`, body, {observe: 'response'});
  }

  updateBrand(body: PostBrand, id: number) {
    return this.http.put(`${environment.inventoryServiceUrl}brand/${id}`, body, {observe: 'response'});
  }

  deleteBrand(id: number) {
    return this.http.delete(`${environment.inventoryServiceUrl}brand/${id}`, {observe: 'response'});
  }
}
