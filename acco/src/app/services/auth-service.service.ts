import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  
  ;
  constructor( private http:HttpClient) { }
    login(data: any):Observable<any>{
      console.log("I am server");
      return this.http.post('http://localhost:3001/users/auth',data);
    }
    
  }

