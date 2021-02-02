import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {PostGeneralDevice} from '../../entities/generalDevice';

@Injectable({
  providedIn: 'root'
})
export class GeneralDeviceService {

  constructor(private http: HttpClient) { }

  getGeneralDevices() {
    return this.http.get(`${environment.deviceServiceUrl}generalDevice`, {observe: 'response'});
  }

  getGeneralDeviceById(id: number) {
    return this.http.get(`${environment.deviceServiceUrl}generalDevice/${id}`, {observe: 'response'});
  }

  postGeneralDevice(body: PostGeneralDevice) {
    return this.http.post(`${environment.deviceServiceUrl}generalDevice`, body, {observe: 'response'});
  }

  updateGeneralDevice(body: PostGeneralDevice, id: number) {
    return this.http.put(`${environment.deviceServiceUrl}generalDevice/${id}`, body, {observe: 'response'});
  }

  deleteGeneralDevice(id: number) {
    return this.http.delete(`${environment.deviceServiceUrl}generalDevice/${id}`, {observe: 'response'});
  }
}
