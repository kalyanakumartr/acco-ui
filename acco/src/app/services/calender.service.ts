import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CalenderService {

  constructor(private http:HttpClient) { }

  getCalender(start:String,end:String): Observable<any>{
    console.log("calender check ");
    console.log(" check " ,start,end);
    
    // return this.http.get<any>(`${environment.getguestdetailmonthly}`);
    
    return this.http.get<any>('http://localhost:3001/users/getguestdetailmonthly?checkin='+start+"&checkout="+end);
  }
}
