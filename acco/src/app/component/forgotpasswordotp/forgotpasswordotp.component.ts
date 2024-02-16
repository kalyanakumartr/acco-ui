import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgOtpInputComponent } from 'ng-otp-input';
import { GenerateOTPService } from 'src/app/services/generate-otp.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgotpasswordotp',
  templateUrl: './forgotpasswordotp.component.html',
  styleUrls: ['./forgotpasswordotp.component.scss']
})
export class ForgotpasswordotpComponent {
  otpverification!: any;
  description="Please enter the 6-digit OTP sent to your registered email"
  mailsent: any;
  otpdata:any
  apidata:any;

  constructor(private fb: FormBuilder,private activatedroute:ActivatedRoute,private generateotp: GenerateOTPService,private router:Router) {}


  ngOnInit(): void {
    
   
    this.activatedroute.params.subscribe((params: Params) =>
       this.mailsent = params[('mailsent')],);
       console.log("mail",this.mailsent)
  }

  otp!: string;
  showOtpComponent = true;
  @ViewChild("ngOtpInput", { static: false }) ngOtpInput: any ; config = { allowNumbersOnly: true, length: 6, isPasswordInput: false, disableAutoFocus: false, placeholder: "*", inputStyles: { width: "25px", height: "25px", }, };
  onOtpChange(item:any){
    console.log("getdata",item)
    this.otpdata=item
  }

  verifyotp(){
    console.log("data",this.otpdata);
    this.generateotp.verifyOTPwithemail(this.mailsent,this.otpdata).subscribe((res)=>{
      this.apidata=res
      console.log(res)
      if(this.apidata.status){
      Swal.fire({
        text:this.apidata.message,
        confirmButtonColor: '#964B00',
        background:'#efc96a',
      }); 
      this.router.navigate(['forgotpasswordform'])
    }else {
      Swal.fire({
        text:this.apidata.message,
        confirmButtonColor: '#964B00',
        background:'#efc96a',
      }); 
    }   
      
    })
  }
}
