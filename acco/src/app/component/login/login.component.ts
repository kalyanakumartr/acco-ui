import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/model/auth.model';
// import { Auth } from 'src/app/model/auth.model';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginData:any;
  type:string = "password";
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  userName: string ="";
  password: string ="";
  loginForm!:FormGroup;
  constructor(private fb: FormBuilder,private http: HttpClient, private router: Router,private authService:AuthServiceService){}
  ngOnInit():void{
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });

  }
    hideShowPass(){
      this.isText = !this.isText;
      this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
      this.isText ? (this.type = 'text') : (this.type = 'password');
    }

    loginProcess(){
      // const newuser = new UserModel() ;
      // const formData = this.loginForm.value;
      // newuser.username = formData.userName;
      // newuser.password = formData.password;
      // console.log(newuser);
      // Swal.fire("Success");
      // if(this.loginForm.value){
        this.authService.login(this.loginForm.value).subscribe(result=>{ 
          if(result.accesstoken) {
            this.loginData=result;
            this.authService.setData(this.loginData) 
            console.log("++++",this.loginData)
            localStorage.setItem('token',result.accesstoken); 
            console.log(result.accesstoken);
            // alert("login sucessful"); 
            Swal.fire(result.message);           
            this.loginForm.reset();
            this.router.navigate(["roomtype"])
          }                  
          
          
        },
        error=>{
          Swal.fire("Invalid Credentials"); 
        }
        )
               
      
    
  }
    
}
