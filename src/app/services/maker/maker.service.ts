import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {PostMaker} from '../../entities/Maker';

@Injectable({
  providedIn: 'root'
})
export class MakerService {

  constructor(private http: HttpClient) { }

  getMakers() {
    return this.http.get(`${environment.deviceServiceUrl}maker`, {observe: 'response'});
  }

  getMakerById(id: number) {
    return this.http.get(`${environment.deviceServiceUrl}maker/${id}`, {observe: 'response'});
  }

  postMaker(body: PostMaker) {
    return this.http.post(`${environment.deviceServiceUrl}maker`, body, {observe: 'response'});
  }

  updateMaker(body: PostMaker, id: number) {
    return this.http.put(`${environment.deviceServiceUrl}maker/${id}`, body, {observe: 'response'});
  }

  deleteMaker(id: number) {
    return this.http.delete(`${environment.deviceServiceUrl}maker/${id}`, {observe: 'response'});
  }
}
