import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { GetRoomList } from '../model/getroomlist.model';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { BookingModel } from '../model/booking.model';

@Injectable({
  providedIn: 'root'
})
export class GetroomlistService {
  private apiRoom = new BehaviorSubject<any>(null);
  public apiRoom$ = this.apiRoom.asObservable();
  constructor(private http:HttpClient) { }

  roomlist(adult:any,checkIn:any,checkOut:any,roomType:any):Observable<any>{
    console.log("I am roomlist"); 
    console.log("checkhere",adult,checkIn,checkOut)
    
    console.log("roomtype",roomType)
       
    return this.http.get("http://localhost:3001/booking/getroomlist?adults="+adult+"&checkin="+checkIn+"&checkout="+checkOut+"&roomtypeid="+roomType);
  }
  setData(roomData: any) { 
    this.apiRoom.next(roomData)
  }

  roomlogic(adult:any,checkIn:any,checkOut:any,):Observable<any>{
    console.log("I am roomlogic"); 

    return this.http.get("http://localhost:3001/booking/getlogic?adult="+adult+"&checkin="+checkIn+"&checkout="+checkOut);

  }

  roomconfirm(data:BookingModel):Observable<BookingModel>{
    console.log("I am confirm"); 
    console.log("I am confirm",data); 

    return this.http.post<BookingModel>("http://localhost:3001/booking/checkinconfirm",data);

  }

}
