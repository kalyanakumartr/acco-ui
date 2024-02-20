import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchpassword } from '../matchpassword/matchpassword.component';
import { ForgotpasswordService } from 'src/app/services/forgotpassword.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
  apiresult:any;
  addemail:any;




  constructor(private fb: FormBuilder,private forgotpasswordservice:ForgotpasswordService,private router:Router,private activatedroute:ActivatedRoute) {}

  ngOnInit(): void {

    this.activatedroute.params.subscribe((params: Params) =>
       this.addemail = params[('addmail')],);
       console.log("mail",this.addemail)
    
    this.forgotpasswordform = this.fb.group({
      email:this.addemail,
      password: ['',[ Validators.required,Validators.pattern("^[a-zA-z0-9]{3,8}$")]],
      confirmpassword: ['',[ Validators.required,Validators.pattern("^[a-zA-z0-9]{3,8}$")]],


    },
    {
      validators: matchpassword
   });

  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  changepassword(){
    const resetpassworddata = this.forgotpasswordform.value
    console.log("forgotpasswordform",resetpassworddata)

    this.forgotpasswordservice.forgotpasswordreset(resetpassworddata.email,resetpassworddata.password,resetpassworddata.confirmpassword)
    .subscribe((result)=>{

      console.log(result);
      this.apiresult=result
      Swal.fire({
        text:this.apiresult.message,
        confirmButtonColor: '#964B00',
        background:'#efc96a',
      });    
      this.router.navigate(['login'])

    })

  }
}
