import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {PostPresentation} from '../../entities/presentation';

@Injectable({
  providedIn: 'root'
})
export class PresentationService {

  constructor(private http: HttpClient) { }

  getPresentations() {
    return this.http.get(`${environment.inventoryServiceUrl}presentation`, {observe: 'response'});
  }

  getPresentationById(id: number) {
    return this.http.get(`${environment.inventoryServiceUrl}presentation/${id}`, {observe: 'response'});
  }

  postPresentation(body: PostPresentation) {
    return this.http.post(`${environment.inventoryServiceUrl}presentation`, body, {observe: 'response'});
  }

  updatePresentation(body: PostPresentation, id: number) {
    return this.http.put(`${environment.inventoryServiceUrl}presentation/${id}`, body, {observe: 'response'});
  }

  deletePresentation(id: number) {
    return this.http.delete(`${environment.inventoryServiceUrl}presentation/${id}`, {observe: 'response'});
  }
}
