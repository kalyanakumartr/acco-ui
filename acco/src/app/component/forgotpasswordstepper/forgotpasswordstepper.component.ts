import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GenerateOTPService } from 'src/app/services/generate-otp.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgotpasswordstepper',
  templateUrl: './forgotpasswordstepper.component.html',
  styleUrls: ['./forgotpasswordstepper.component.scss']
})
export class ForgotpasswordstepperComponent {
  emailverificationform!: FormGroup;
  description = "Enter your registered email to send OTP for verification"
  constructor(private fb: FormBuilder, private generateotp: GenerateOTPService,private router:Router
  ) { }

  ngOnInit(): void {

    this.emailverificationform = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    });

  }

  // firstFormGroup = this._formBuilder.group({
  //   firstCtrl: ['', Validators.required],
  // });
  // secondFormGroup = this._formBuilder.group({
  //   secondCtrl: ['', Validators.required],
  // });


  verifyemail() {
    console.log("email", this.emailverificationform.value);
    const emaildata = this.emailverificationform.value
    console.log("email", emaildata.email);

    this.generateotp.genOTP(emaildata.email).subscribe((result) => {
      console.log(result);
      Swal.fire({
        text:result.message,
        confirmButtonColor: '#964B00',
        background:'#efc96a',
      });      
       this.router.navigate(['forgotpasswordotp',{"mailsent":emaildata.email}])
    })

  }

}
