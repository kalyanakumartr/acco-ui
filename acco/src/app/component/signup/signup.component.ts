import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserModel } from 'src/app/model/auth.model';
import { RegisterServiceService } from 'src/app/services/register-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
  signupForm!:FormGroup;
  user =new UserModel();
  
  
  
    constructor(private fb: FormBuilder,
      private http: HttpClient, 
      private router: Router,
      private registerService:RegisterServiceService,
      
      ){}
  ngOnInit():void{
    this.signupForm = this.fb.group({
      firstname: ['', [ Validators.required,Validators.pattern("^[a-zA-Z]{3,15}$")]],
      lastname: ['', [Validators.required,Validators.pattern("^[a-zA-Z]$")]],
       address1: ['',[ Validators.required,Validators.pattern("^[a-zA-Z0-9,./ ]*$")]],
       address2: ['',[ Validators.required,Validators.pattern("^[a-zA-Z0-9,./ ]*$")]],
       city: ['', [ Validators.required,Validators.pattern("^[a-zA-Z]*$")]],
       state: ['', [ Validators.required,Validators.pattern("^[a-zA-Z]*$")]],
       pincode:['',[Validators.required,Validators.pattern("^[0-9]*$")]],
       country: ['', [ Validators.required,Validators.pattern("^[a-zA-Z]*$")]],
      phonenumber: ['',[Validators.required,Validators.pattern("^[0-9]{0,10}$")]],
      email:['',[ Validators.required,Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      username:['',[Validators.required,Validators.pattern("^[A-Za-z0-9-,@.]$")]],
      password: ['',[ Validators.required,Validators.pattern("^[a-zA-z0-9]$")]],
      confirmpassword: ['',[ Validators.required,Validators.pattern("^[a-zA-z0-9]$")]],
      roleid:3
    
     
    });
  }

    signupFormProcess(){
      const newuser = new UserModel() ;
      const formData = this.signupForm.value;
      newuser.firstname = formData.firstname;
      newuser.lastname = formData.lastname;
      newuser.email = formData.email;
      newuser.phonenumber = formData.phonenumber;
      newuser.address1 = formData.address1;
      newuser.address2 = formData.address2;
      newuser.city = formData.city;
      newuser.state = formData.state;
      newuser.pincode = formData.pincode
      newuser.country = formData.country;
      newuser.username = formData.username;
      newuser.password = formData.password;
      newuser.cpassword = formData.confirmpassword;
      newuser.roleid=formData.roleid;
      // Swal.fire("Success");
  if(this.signupForm.valid){
    console.log(this.user);

    this.registerService.register(newuser).    
    subscribe( result=>{
     
       console.log(result);
        // alert("login sucessful"); 
        this.signupForm.reset();
        Swal.fire({
          text:result.message,
          confirmButtonColor: '#964B00',
          background:'#efc96a',
        });      
         this.router.navigate(["login"])
     
    })
  }
    }



}
