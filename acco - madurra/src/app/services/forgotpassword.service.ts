import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ForgotpasswordService {

  constructor(private http: HttpClient) { }

  forgotpasswordreset(email:any,password:any,cpassword:any){
    console.log(email,password)
    console.log("I am forgotpasswordreset");
      return this.http.post(`${environment.forgotpassword}`,{email:email,password:password,cpassword:password});
  }
}
