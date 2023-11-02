import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { GetUser } from '../model/getuser.model';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class GetUserServiceService {

  constructor(private httpClient : HttpClient) { }

  getUser(): Observable<any>{
    console.log("getuser check purpose");
    // return this.httpClient.get<Role[]>(`${environment.roleapiUrl}`);
    return this.httpClient.get<any>(`${environment.getuserURL}`);
    
    
  }
}
