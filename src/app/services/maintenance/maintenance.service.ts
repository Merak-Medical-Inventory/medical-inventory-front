import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {PostMaintenance} from '../../entities/maintenance';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  constructor(private http: HttpClient) { }

  getMaintenances() {
    return this.http.get(`${environment.deviceServiceUrl}maintenance`, {observe: 'response'});
  }

  getMaintenancesInventory(id: number) {
    return this.http.get(`${environment.deviceServiceUrl}maintenance/inventory/${id}`, {observe: 'response'});
  }

  getMaintenanceById(id: number) {
    return this.http.get(`${environment.deviceServiceUrl}maintenance/${id}`, {observe: 'response'});
  }

  postMaintenance(body: PostMaintenance) {
    return this.http.post(`${environment.deviceServiceUrl}maintenance`, body, {observe: 'response'});
  }

  updateMaintenance(body: PostMaintenance, id: number) {
    return this.http.put(`${environment.deviceServiceUrl}maintenance/${id}`, body, {observe: 'response'});
  }

  deleteMaintenance(id: number) {
    return this.http.delete(`${environment.deviceServiceUrl}maintenance/${id}`, {observe: 'response'});
  }
}
