import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {PostDepartmentOrderStats, PostDeviceAgeStats} from '../../entities/stats';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http: HttpClient) { }

  getDevicesAgeStats(body: PostDeviceAgeStats) {
    return this.http.post(`${environment.deviceServiceUrl}device/order`, body,  {observe: 'response'});
  }

  getDepartmentsOrder(body: PostDepartmentOrderStats) {
    return this.http.post(`${environment.inventoryServiceUrl}orderDepartment/departmentStats`, body, {observe: 'response'});
  }

  getItemsDepartmentsOrder(body: PostDepartmentOrderStats) {
    return this.http.post(`${environment.inventoryServiceUrl}orderDepartment/itemStats`, body, {observe: 'response'});
  }
}
