import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  
  constructor(private http:HttpClient) { }
  register(data: any):Observable<any>{
    console.log("I am register");
    return this.http.post('http://localhost:3001/users/adduser',data);
  }
}
