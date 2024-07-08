import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
// import { GetUser } from '../model/getuser.model';
import { environment } from '../environments/environments';
import { UserModel } from '../model/auth.model';

@Injectable({
  providedIn: 'root'
})
export class GetUserServiceService {
  bookingdata:any;
  private apiData = new BehaviorSubject<any>(null);
  public apiData$ = this.apiData.asObservable();
  constructor(private http : HttpClient) { }

  getUser(): Observable<any>{
    console.log("getuser check purpose");
    // return this.httpClient.get<Role[]>(`${environment.roleapiUrl}`);
    return this.http.get<any>(`${environment.getuserURL}`);
    
    
  }

  getUserById(id: any):Observable<any>{
    console.log("getuser by id");
    return this.http.get<any>(`${environment.getuserwithuserid}`+id)
    // .pipe(map(result => {
    //   this.bookingdata = result;
    //   console.log("databook",this.bookingdata)
    //   this.setData(this.bookingdata)
      
    // }))
  }
  // setData(bookingdata: any) {
  //   this.apiData.next(bookingdata)
  // }
  myBooking(id: any): Observable<any>{
    console.log("getMybooking");     
    return this.http.get<any>(`${environment.getbookingwithuseridonly}`+id);
  }

  

  changePassword(user:UserModel):Observable<UserModel>{
    console.log("I am changepasword");    
    return this.http.post<UserModel>(`${environment.changepassword}`,user);
  }

  canceledBooking(id: any): Observable<any>{
    console.log("getMybooking");     
    return this.http.get<any>(`${environment.getcanceledbooking}`+id);
  }
}
