import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { fooditem } from '../model/fooditem.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetdetailsInterceptor } from './getdetails.interceptor';

@Injectable({
  providedIn: 'root',
})
export class FooditemService {
  constructor(private httpClient: HttpClient) {}

  getfooditem(): Observable<fooditem[]> {
    
    return this.httpClient.get<fooditem[]>(`${environment.fooditemapiUrl}`);
  }
}
