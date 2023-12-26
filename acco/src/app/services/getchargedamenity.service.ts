import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetchargedamenityService {

  constructor(private http:HttpClient) { }

  getChargedData():Observable<any>{
    console.log("charged data api "); 
       
    return this.http.get("http://localhost:3001/booking/getChargedAmenities");
  }
}
