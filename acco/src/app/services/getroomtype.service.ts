import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

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
}
