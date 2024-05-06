import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CalenderService {

  constructor(private http:HttpClient) { }

  getCalender(): Observable<any>{
    console.log("calender check ");
    
    // return this.http.get<any>(`${environment.getguestdetailmonthly}`);
    
    return this.http.get<any>('http://localhost:3001/users/getguestdetailmonthly?checkin="2024-05-01"&checkout="2024-05-25"');
  }
}
