import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../model/auth.model';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  
  constructor(private http:HttpClient) { }
  register(user:UserModel):Observable<UserModel>{
    console.log("I am register");    
    return this.http.post<UserModel>(`${environment.registerURL}`, user);
  }
  
}
