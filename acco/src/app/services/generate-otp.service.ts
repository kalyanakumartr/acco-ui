import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ForOtp } from '../model/otp.model';

@Injectable({
  providedIn: 'root'
})
export class GenerateOTPService {

  constructor(private http:HttpClient) { }
  genOTP(otp:ForOtp):Observable<any>{
    console.log("I am otpgenerate");
    
    return this.http.post("http://localhost:3001/users/generateOTP",otp);
  }
  verifyOTP(verify:ForOtp){
    console.log("I am verifyOTP");
      return this.http.post("http://localhost:3001/users/verifyOTP",verify);
  }
}
