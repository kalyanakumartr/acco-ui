import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { GetUser } from '../model/getuser.model';
import { environment } from '../environments/environments';
import { UserModel } from '../model/auth.model';

@Injectable({
  providedIn: 'root'
})
export class GetUserServiceService {

  constructor(private http : HttpClient) { }

  getUser(): Observable<any>{
    console.log("getuser check purpose");
    // return this.httpClient.get<Role[]>(`${environment.roleapiUrl}`);
    return this.http.get<any>(`${environment.getuserURL}`);
    
    
  }

  getUserById(id: any):Observable<any>{
    console.log("getuser by id");
    return this.http.get<any>("http://localhost:3001/users/getuserwithuserid?userid="+id);
  }

  myBooking(id: any): Observable<any>{
    console.log("getMybooking");     
    return this.http.get<any>("http://localhost:3001/booking/getbookingwithuserid?userid="+id);
  }

  changePassword(user:UserModel):Observable<UserModel>{
    console.log("I am changepasword");    
    return this.http.post<UserModel>("http://localhost:3001/authentication/changepassword",user);
  }
}
