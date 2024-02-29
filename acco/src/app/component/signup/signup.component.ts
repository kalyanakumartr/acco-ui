import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { UserModel } from 'src/app/model/auth.model';
import { RegisterServiceService } from 'src/app/services/register-service.service';
import Swal from 'sweetalert2';
import { matchpassword } from '../matchpassword/matchpassword.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
  signupForm!:FormGroup;
  user =new UserModel();
  eyeIcon: string = 'fa-eye-slash';
  isText: boolean = false;
  type: string = "password";
  eyeIcon1: string = 'fa-eye-slash';
  isText1: boolean = false;
  type1: string = "password";
  roleid:any
  
  
  
    constructor(private fb: FormBuilder,
      private http: HttpClient, 
      private router: Router,
      private registerService:RegisterServiceService,
      private activatedroute:ActivatedRoute
      
      ){}
  ngOnInit():void{
    this.activatedroute.params.subscribe((params: Params) =>
    this.roleid = params[('roleid')],);
    console.log("role",this.roleid)

    this.signupForm = this.fb.group({
      firstname: ['', [ Validators.required,Validators.pattern("^[a-zA-Z ]{3,15}$")]],
      lastname: ['', [Validators.required,Validators.pattern("^[a-zA-Z ]*$")]],
       address1: ['',[ Validators.required,Validators.pattern("^[a-zA-Z0-9,./ ]*$")]],
       address2: ['',[ Validators.required,Validators.pattern("^[a-zA-Z0-9,./ ]*$")]],
       city: ['', [ Validators.required,Validators.pattern("^[a-zA-Z ]*$")]],
       state: ['', [ Validators.required,Validators.pattern("^[a-zA-Z ]*$")]],
       pincode:['',[Validators.required,Validators.pattern("^[0-9]{6}$")]],
       country: ['', [ Validators.required,Validators.pattern("^[a-zA-Z ]*$")]],
      phonenumber: ['',[Validators.required,Validators.pattern("^[0-9]{0,10}$")]],
      email:['',[ Validators.required,Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      username:['',[Validators.required,Validators.pattern("^[A-Za-z0-9-,@._]*$")]],
      password: ['',[ Validators.required,Validators.pattern("^[a-zA-z0-9@.&_]{3,15}$")]],
      confirmpassword: ['',[ Validators.required,Validators.pattern("^[a-zA-z0-9@.&_]{3,15}$")]],
      // "^[a-zA-z0-9@.&_]{8,15}$"
      // '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?_&])[A-Za-zd$@$!%*?_&].{8,15}'
      roleid:this.roleid
    
     
    },
    {
       validators: matchpassword
    }
    );
  }

  // const matchpassword : ValidatorFn = (control: AbstractControl):ValidationErrors|null =>{

  //   let password = control.get('password');
  //   let confirmpassword = control.get('confirmpassword');
  //   if(password && confirmpassword && password?.value != confirmpassword?.value){
  //      return {
  //          passwordmatcherror : true }
  //   }
  //  return null; 
  // }
  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }
  hideShowPass1() {
    this.isText1 = !this.isText1;
    this.isText1 ? (this.eyeIcon1 = 'fa-eye') : (this.eyeIcon1 = 'fa-eye-slash');
    this.isText1 ? (this.type1 = 'text') : (this.type1 = 'password');
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
