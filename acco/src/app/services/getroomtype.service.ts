import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { BookingModel } from '../model/booking.model';

@Injectable({
  providedIn: 'root'
})
export class GetroomtypeService {

  constructor(private http:HttpClient) { }

  getRoomType():Observable<any>{
    console.log("GetRoomType"); 
       
    return this.http.get(`${environment.roomtype}`);
  }

  getManageRoom(): Observable<any>{
    return this.http.get<any>("http://localhost:3001/room/getroom");
  }

  getRoomStatus(type:any):Observable<any>{
    console.log("GetRoomStatus",type); 
       
    return this.http.get("http://localhost:3001/room/getstatus?stastustype="+type);
    // http://localhost:3001/logic/getlogic?adult="+adult+"&cin="+checkIn+"&cout="+checkOut);

  }

  updateRoomStatus(book:BookingModel):Observable<BookingModel>{
    console.log("I am updateroomstatus");
    console.log("updatestatus",book);
    return this.http.post<BookingModel>("http://localhost:3001/room/roomupdatestatus",book);
  }


}
