import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class GetchargedamenityService {

  constructor(private http:HttpClient) { }

  getChargedData():Observable<any>{
    console.log("charged data api "); 
       
    return this.http.get(`${environment.getChargedAmenities}`);
  }
}
