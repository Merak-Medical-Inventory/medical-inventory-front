import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {PostDeviceAgeStats} from '../../entities/stats';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http: HttpClient) { }

  getDevicesAgeStats(body: PostDeviceAgeStats) {
    return this.http.post(`${environment.deviceServiceUrl}device/order`, body,  {observe: 'response'});
  }
}
