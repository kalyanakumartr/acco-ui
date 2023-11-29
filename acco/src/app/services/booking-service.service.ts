import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { BookingModel } from '../model/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {

  constructor(private http:HttpClient) { }
  booking(book:BookingModel):Observable<BookingModel>{
    console.log("I am booking");
    return this.http.post<BookingModel>(`${environment.bookingURL}`,book);
  }
}
