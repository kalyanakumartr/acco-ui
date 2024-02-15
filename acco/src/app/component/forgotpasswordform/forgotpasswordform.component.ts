import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgotpasswordform',
  templateUrl: './forgotpasswordform.component.html',
  styleUrls: ['./forgotpasswordform.component.scss']
})
export class ForgotpasswordformComponent {
  forgotpasswordform!: FormGroup;
  eyeIcon: string = 'fa-eye-slash';
  type: string = "password";
  isText: boolean = false;
  description="Enter your new password"




  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    
    this.forgotpasswordform = this.fb.group({
      email:['',[ Validators.required,Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['',[ Validators.required,Validators.pattern("^[a-zA-z0-9]{3,8}$")]],
      confirmpassword: ['',[ Validators.required,Validators.pattern("^[a-zA-z0-9]{3,8}$")]],


    });

  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  changepassword(){}
}
