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
        return this.http.post<BookingModel>(`${environment.bookingCancel}`,book);
      }

    checkOut(id:any,cout:any,sid:any):Observable<any>{
      return this.http.post<any>("http://localhost:3001/booking/actualcheckout",{bookingid:id,acheckout:cout,statusid:sid});
    }

    getcancelpolicy(): Observable<any>{
      console.log("canelpolicy check ");
      // return this.httpClient.get<Role[]>(`${environment.roleapiUrl}`);
      return this.http.get<any>(`http://localhost:3001/booking/cancelpolicy`);
      
      
    }
  }
