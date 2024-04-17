import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ForOtp } from '../model/otp.model';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class GenerateOTPService {

  constructor(private http:HttpClient) { }
  genOTP(data:any):Observable<any>{
    console.log("I am otpgenerate");
    
    return this.http.get(`${environment.generateOTP}`+data);
  }
  verifyOTP(verify:ForOtp){
    console.log("I am verifyOTP");
      return this.http.post(`${environment.verifyOTP}`,verify);
  }
  verifyOTPwithemail(email:any,otp:any){
    console.log(email,otp)
    console.log("I am verifyOTP");
      return this.http.post(`${environment.verifyOTPwithemail}`,{email:email,inputotp:otp});
  }
}
