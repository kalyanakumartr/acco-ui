import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetguestdetailService {


  // private getGuest = new BehaviorSubject<any>(null);
  // public getGuest$ = this.getGuest.asObservable();

  constructor(private http: HttpClient) { }

  getGuestData(date: any): Observable<any> {
console.log("date is passing",date)
    return this.http.get("http://localhost:3001/users/getguestdetail?checkin="+date);
  }


  
   

  
}
