import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ForOtp } from '../model/otp.model';

@Injectable({
  providedIn: 'root'
})
export class GenerateOTPService {

  constructor(private http:HttpClient) { }
  genOTP(data:any):Observable<any>{
    console.log("I am otpgenerate");
    
    return this.http.get("http://localhost:3001/email/generateOTP?email="+data);
  }
  verifyOTP(verify:ForOtp){
    console.log("I am verifyOTP");
      return this.http.post("http://localhost:3001/email/verifyOTP",verify);
  }
  verifyOTPwithemail(email:any,otp:any){
    console.log(email,otp)
    console.log("I am verifyOTP");
      return this.http.post("http://localhost:3001/email/verifyOTP",{email:email,inputotp:otp});
  }
}
