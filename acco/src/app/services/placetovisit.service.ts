import { Injectable } from '@angular/core';
import { Placetovisit} from '../model/placttovisit.model';
import { environment } from '../environments/environments';
import{HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PlacetovisitService {
  constructor(private httpClient : HttpClient ) {}
   getplace(): Observable<Placetovisit[]>{
    console.log("get check purpose");
    return this.httpClient.get<Placetovisit[]>(`${environment.placUrl}`);
  }
  }
