import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
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
      // Swal.fire("Success");
      if(this.loginForm.valid){
        this.authService.login(this.loginForm.value).subscribe(result=>{
          if(result.status){
            console.log(result);
            this.loginForm.reset();
            // alert("login sucessful"); 
            Swal.fire("Success");
          }else{
            // alert("Invalid")
            Swal.fire("Invalid");
          }
        })
      }
    //   let bodyData = {
    //     "userName" : this.userName,
    //     "password" : this.password,
        
    //   };
    //   this.http.post("http://localhost:3001/users/auth",bodyData).subscribe((resultData: any)=>
    // {
    //     console.log(resultData);
    //     alert("Login Successfully")
       
    //   if(resultData){
    //     alert('Login Succesful');
    //           this.loginForm.reset()
    //         this.router.navigate(["home"])
    //   }
    // });
    // if(resultData){
    //       alert('Login Succesful');
    //       this.loginForm.reset()
    //     this.router.navigate(["home"])
    //     }else{
    //       alert("user not found")
    //     }
    //   }
      // ,err=>{
      //   alert("Something went wrong")
      // })
  }
    //   this.http.get<any>("http://localhost:3001/users/auth")
    // .subscribe(res=>{
    //   const user = res.find((a:any)=>{
    //     return a.userName === this.loginForm.value.userName && a.password === this.loginForm.value.password 
    //   });
    //   if(user){
    //     alert('Login Succesful');
    //     this.loginForm.reset()
    //   this.router.navigate(["home"])
    //   }else{
    //     alert("user not found")
    //   }
    // },err=>{
    //   alert("Something went wrong")
    // })
}
