import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {

  constructor(private http:HttpClient) { }
  booking(data: any):Observable<any>{
    console.log("I am booking");
    return this.http.post('http://localhost:3001/users/addbooking',data);
  }
}
