import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { PostLot } from '../../entities/lot';

@Injectable({
  providedIn: 'root'
})
export class LotService {

  constructor(private http: HttpClient) { }

  postLot(body: PostLot) {
    return this.http.post(`${environment.inventoryServiceUrl}lot`, body, {observe: 'response'});
  }

}
