import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterServiceService } from 'src/app/services/register-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
  signupForm!:FormGroup;
  constructor(private fb: FormBuilder,private http: HttpClient, private router: Router,private registerService:RegisterServiceService){}
  ngOnInit():void{
    this.signupForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      phonenumber: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
     
      
     
    });
  }

    signupProcess(){
      // Swal.fire("Success");
  if(this.signupForm.valid){
    this.registerService.register(this.signupForm.value).subscribe((result: any)=>{
      
        console.log(result);
        
        // alert("login sucessful"); 
        Swal.fire(" Registered Successfully");
        this.signupForm.reset();
        this.router.navigate(["signup"])
     
    })
  }
    }



}
