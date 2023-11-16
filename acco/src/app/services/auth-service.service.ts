import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

import { environment } from '../environments/environments';
import { UserModel } from '../model/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  
  
  private apiData = new BehaviorSubject<any>(null);
  public apiData$ = this.apiData.asObservable();
 
  
  constructor( private http:HttpClient) {}
   
  login(data: any):Observable<any>{
      console.log("I am server");
      return this.http.post(`${environment.authURL}`,data);
        
      };

      setData(loginData: any) { 
        this.apiData.next(loginData)
      }
      // logout(){
      //   localStorage.removeitem('token');
      // }
    }

   
    
  
  

