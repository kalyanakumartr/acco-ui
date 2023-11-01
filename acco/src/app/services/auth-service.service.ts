import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Auth } from '../model/auth.model';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  
  private apiData = new BehaviorSubject<any>(null);
  public apiData$ = this.apiData.asObservable();

  constructor( private http:HttpClient) { }

  // login(data: any): Observable<Auth[]>{
  //   console.log("getrole check purpose");
  //   // return this.httpClient.get<Role[]>(`${environment.roleapiUrl}`);
  //   return this.httpClient.post<Auth[]>(`${environment.authURL}`,data);
    
    
  // }
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

   
    
  
  

