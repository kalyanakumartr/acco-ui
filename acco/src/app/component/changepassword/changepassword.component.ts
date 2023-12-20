import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/model/auth.model';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { GetUserServiceService } from 'src/app/services/get-user-service.service';
import { RegisterServiceService } from 'src/app/services/register-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit{
  passwordForm!: FormGroup;
  loginData:any;
  res:any;
  constructor(private fb: FormBuilder, 
    private http: HttpClient, 
    private router: Router, 
   private registerService: RegisterServiceService,
   public authService:AuthServiceService,
   private getuserservice:GetUserServiceService
    ) { 
      authService.apiData$.subscribe(data => this.loginData = data)
    }
  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      password: ['', Validators.required],
      cpassword: ['', Validators.required],
    });
  }
  passwordProcess(){
    const newuser = new UserModel() ;
    const formData = this.passwordForm.value;
    newuser.userid = this.loginData.userid;
    newuser.password = formData.password;
    newuser.cpassword = formData.cpassword;
    if(this.passwordForm.valid){
      console.log(newuser);
  
      this.getuserservice.changePassword(newuser).    
      subscribe( result=>{
       this. res=result;
         console.log(result);
         
          this.passwordForm.reset();
          Swal.fire( this.res.message);      
          //  this.router.navigate(["login"])
       
      })
    }
  }
}
