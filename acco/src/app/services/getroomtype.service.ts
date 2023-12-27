import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetroomtypeService {

  constructor(private http:HttpClient) { }

  getRoomType():Observable<any>{
    console.log("GetRoomType"); 
       
    return this.http.get("http://localhost:3001/booking/roomtype");
  }
}
