import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { GetRoomList } from '../model/getroomlist.model';

@Injectable({
  providedIn: 'root'
})
export class GetroomlistService {
  private apiRoom = new BehaviorSubject<any>(null);
  public apiRoom$ = this.apiRoom.asObservable();
  constructor(private http:HttpClient) { }

  roomlist(adult:any,checkIn:any,checkOut:any,noofdays:any):Observable<any>{
    console.log("I am roomlist"); 
    console.log("checkhere",adult,checkIn,checkOut)
    console.log("no of days",noofdays)
       
    return this.http.get("http://localhost:3001/booking/getroomlist?adults="+adult+"&checkin="+checkIn+"&checkout="+checkOut);
  }
  setData(roomData: any) { 
    this.apiRoom.next(roomData)
  }
}
