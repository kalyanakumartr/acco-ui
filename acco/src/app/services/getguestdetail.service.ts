import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BookingModel } from '../model/booking.model';

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

//get roomslistapi
  getroomsList(bookingid: any,checkin:any,checkout:any): Observable<any> {
    console.log("date is passing",bookingid,checkin,checkout)
        return this.http.get("http://localhost:3001/booking/getroomslist?bookingid="+bookingid+"&checkin="+checkin+"&checkout="+checkout);
      }

  bookRoomList(book:BookingModel):Observable<BookingModel>{
      console.log("I am booking");
      return this.http.post<BookingModel>("http://localhost:3001/booking/checkinconfirm",book);
    }
  }
   

  

