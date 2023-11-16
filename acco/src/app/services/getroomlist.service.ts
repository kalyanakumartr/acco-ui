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

  roomlist(room: GetRoomList):Observable<GetRoomList>{
    console.log("I am roomlist"); 
       
    return this.http.get<GetRoomList>("http://localhost:3001/users/getroomlist?adults="+room);
  }
  setData(roomData: any) { 
    this.apiRoom.next(roomData)
  }
}
