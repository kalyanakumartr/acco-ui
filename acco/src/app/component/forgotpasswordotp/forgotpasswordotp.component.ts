import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgotpasswordotp',
  templateUrl: './forgotpasswordotp.component.html',
  styleUrls: ['./forgotpasswordotp.component.scss']
})
export class ForgotpasswordotpComponent {
  otpverification!: any;
  description="Please enter the 6-digit OTP sent to your registered email"

  constructor(private fb: FormBuilder) {}


  ngOnInit(): void {
    
    this.otpverification = this.fb.group({
      otp:['', Validators.required],
    });

  }

  otp!: string;
  showOtpComponent = true;
  @ViewChild("ngOtpInput", { static: false }) ngOtpInput: any; config = { allowNumbersOnly: true, length: 6, isPasswordInput: false, disableAutoFocus: false, placeholder: "*", inputStyles: { width: "25px", height: "25px", }, };

  onOtpChange(item:any){}

  verifyotp(){}
}
