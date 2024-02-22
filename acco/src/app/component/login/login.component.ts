import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/model/auth.model';
// import { Auth } from 'src/app/model/auth.model';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginData: any;
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  userName: string = "";
  password: string = "";
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthServiceService) { }
  ngOnInit(): void {

    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern("^[A-Za-z0-9-,@.]{3,15}$")]],
      password: ['', [Validators.required, Validators.pattern("^[a-zA-z0-9]{3,8}$")]],
    });

  }
  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  loginProcess() {

    this.authService.login(this.loginForm.value).subscribe(result => {

      console.log(result);
    },
      error => {
        Swal.fire({
          text: error.message,
          confirmButtonColor: '#964B00',
          background: '#efc96a',
        });
      }
    )

      // Swal.fire({
      //   text:result.message,
      //   confirmButtonColor: '#964B00',
      //   background:'#efc96a',
      // });    
      // console.log(result);
      //  console.log(result.usertype)
      // if (result.accesstoken) {
      //   this.loginData = result;
      //   this.authService.setData(this.loginData)
      //   console.log("++++", this.loginData)
      //   localStorage.setItem('token', result.accesstoken);
      //   console.log(result.accesstoken, result.usertype);

      //   if (result.usertype == "Admin") {
      //     this.router.navigate(["admin"])
      //   } else if (result.usertype == "Manager") {
      //     this.router.navigate(["frontdesk"])
      //   } else {
      //     this.router.navigate(["home"])
      //   }
        // if(result.accesstoken) {
        //   this.loginData=result;
        //   this.authService.setData(this.loginData) 
        //   console.log("++++",this.loginData)
        //   localStorage.setItem('token',result.accesstoken); 
        //   console.log(result.accesstoken,result.usertype);
        //   // alert("login sucessful"); 
        //   Swal.fire(result.message);           
        //   this.loginForm.reset();
        //   this.router.navigate(["home"])
      }


  // },
  //   error => {
  //     Swal.fire("Invalid Credentials");
  //   }
  // )

  signup(){
    this.router.navigate(["signup",{roleid:3}])
   
  }

}

 
