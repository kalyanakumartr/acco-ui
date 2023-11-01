import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { fooditem } from '../model/fooditem.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FooditemService {
  constructor(private httpClient: HttpClient) {}

  showfooditem(): Observable<fooditem[]> {
    return this.httpClient.get<fooditem[]>(`${environment.fooditemapiUrl}`);
  }
}
