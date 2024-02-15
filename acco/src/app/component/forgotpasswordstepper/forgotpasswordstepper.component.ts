import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgotpasswordstepper',
  templateUrl: './forgotpasswordstepper.component.html',
  styleUrls: ['./forgotpasswordstepper.component.scss']
})
export class ForgotpasswordstepperComponent {
  emailverificationform!: FormGroup ;
  description="Enter your registered email to send OTP for verification"
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    
    this.emailverificationform = this.fb.group({
      email:['',[ Validators.required,Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    });

  }

  // firstFormGroup = this._formBuilder.group({
  //   firstCtrl: ['', Validators.required],
  // });
  // secondFormGroup = this._formBuilder.group({
  //   secondCtrl: ['', Validators.required],
  // });


  verifyemail(){

  }

}
