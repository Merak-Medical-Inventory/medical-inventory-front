import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {PostDevice, UpdateDevice, UpdateLocationDevice} from '../../entities/device';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http: HttpClient) { }

  getDevices() {
    return this.http.get(`${environment.deviceServiceUrl}device`, {observe: 'response'});
  }

  getDevicesInventory(id: number) {
    return this.http.get(`${environment.deviceServiceUrl}device/inventory/${id}`, {observe: 'response'});
  }

  getDeviceById(id: number) {
    return this.http.get(`${environment.deviceServiceUrl}device/${id}`, {observe: 'response'});
  }

  postDevice(body: PostDevice) {
    return this.http.post(`${environment.deviceServiceUrl}device`, body, {observe: 'response'});
  }

  updateDevice(body: UpdateDevice, id: number) {
    return this.http.put(`${environment.deviceServiceUrl}device/${id}`, body, {observe: 'response'});
  }

  deleteDevice(id: number) {
    return this.http.delete(`${environment.deviceServiceUrl}device/${id}`, {observe: 'response'});
  }

  updateLocation(body: UpdateLocationDevice, id: number) {
    return this.http.put(`${environment.deviceServiceUrl}device/location/${id}`, body, {observe: 'response'});
  }

}
