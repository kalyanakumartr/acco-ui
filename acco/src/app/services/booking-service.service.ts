import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { BookingModel } from '../model/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {

  public messageSource  = new BehaviorSubject<any>(null);
  currentValue = this.messageSource.asObservable();

  constructor(private http:HttpClient) { }
  // booking(book:BookingModel):Observable<BookingModel>{
  //   console.log("I am booking");
  //   return this.http.post<BookingModel>(`${environment.bookingURL}`,book);
  // }

  booking(book:BookingModel):Observable<BookingModel>{
    console.log("I am booking");
    return this.http.post<BookingModel>(`${environment.booking}`,book);
  }

  changeMessage(book:any)
      {
        console.log("i am in book service")
          this.messageSource.next(book);
      }


     bookingCancel(book:BookingModel):Observable<BookingModel>{
        console.log("I am bookingcancel");
        console.log("cancel",book);
        return this.http.post<BookingModel>("http://localhost:3001/booking/bookingcancel",book);
      }
}
