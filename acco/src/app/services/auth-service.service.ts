import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

import { environment } from '../environments/environments';
import { UserModel } from '../model/auth.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private apiData = new BehaviorSubject<any>(null);
  public apiData$ = this.apiData.asObservable();
  authresults:any;
 session:boolean=false;
 loginData:any;
 
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor(private http: HttpClient,private router:Router,
   
    ) { }

  login(data: any): Observable<any> {
    console.log("I am server");
    return this.http.post(`${environment.authURL}`, data)
    .pipe(map(result =>{
      console.log(result);
      this.authresults=result;
      console.log(this.authresults.usertype)
      if (this.authresults.accesstoken) {
        this.loginData = result;
        this.setData(this.loginData)
        console.log("++++", this.loginData)
        localStorage.setItem('token', this.authresults.accesstoken);
        console.log(this.authresults.accesstoken, this.authresults.usertype);
         this.loggedIn.next(true);
    
        if (this.authresults.usertype == "Admin") {
          this.router.navigate(["admin"])
          
        } else if (this.authresults.usertype == "Manager") {
          this.router.navigate(["frontdesk"])
         
        } else {
         
          this.router.navigate(["mybookings"])
        }
  }
}))
    

  };

  setData(loginData: any) {
    this.apiData.next(loginData)
  }

  get isUserLoggedIn() {
    return this.loggedIn.asObservable();
  }
  
logged(){
  return localStorage.getItem('token');
}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(["home"]) 
  }
}






