import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/model/auth.model';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { GetUserServiceService } from 'src/app/services/get-user-service.service';
import { RegisterServiceService } from 'src/app/services/register-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profiledetails',
  templateUrl: './profiledetails.component.html',
  styleUrls: ['./profiledetails.component.scss']
})
export class ProfiledetailsComponent implements OnInit{
  updateForm!:FormGroup;
loginData:any;
userid:any;
getUserData:any;
register:any;
  constructor(private fb: FormBuilder,
    private http: HttpClient, 
    private router: Router,
    private registerService:RegisterServiceService,
    public authService:AuthServiceService,
    private getuserservice:GetUserServiceService
    ){
      authService.apiData$.subscribe(data => this.loginData = data)
    }
ngOnInit():void{
this.userid=this.loginData.userid;
this.getUser(this.userid);
  this.updateForm = this.fb.group({
    
    firstname: ['', [Validators.required,Validators.pattern("^[A-za-z]*$")]],
    lastname: ['', [Validators.required,Validators.pattern("^[A-za-z]*$")]],
    address1: ['', [Validators.required,Validators.pattern("^[A-za-z0-9]*$")]],
    address2: ['', [Validators.required,Validators.pattern("^[A-za-z0-9]*$")]],
    city: ['', [Validators.required,Validators.pattern("^[A-za-z]*$")]],
    state: ['', [Validators.required,Validators.pattern("^[A-za-z]*$")]],
    country: ['', [Validators.required,Validators.pattern("^[A-za-z]*$")]],
    // pincode:['',[Validators.required,Validators.pattern("^[0-9]*$")]],
    phonenumber: ['',[Validators.required,Validators.pattern("^[0-9]*$")]],
    email:['',[ Validators.required,Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    username:['',[Validators.required,Validators.pattern("^[A-za-z0-9]*$")]],
    // password: ['', Validators.required,],
    // confirmpassword: ['', Validators.required,],
    // roleid:3
  
   
  });

}

updateProcess(){
  const updateuser = new UserModel() ;
  const formData = this.updateForm.value;
  updateuser.userid=this.loginData.userid;
  updateuser.firstname = formData.firstname;
  updateuser.lastname = formData.lastname;
  updateuser.email = formData.email;
  updateuser.phonenumber = formData.phonenumber;
  updateuser.address1 = formData.address1;
  updateuser.address2 = formData.address2;
  updateuser.city = formData.city;
  updateuser.state = formData.state;
  updateuser.country = formData.country;
  updateuser.username = formData.username;
 
  // Swal.fire("Success");
if(this.updateForm.valid){
console.log(updateuser);

this.registerService.register(updateuser).    
subscribe( result=>{
 
   console.log(result);
    // alert("login sucessful"); 
    this.updateForm.reset();
    Swal.fire(" Registered Successfully");      
    //  this.router.navigate(["login"])
 
})
}
}

getUser(userid:any){
  this.getuserservice.getUserById(userid)
  // .subscribe((res)=>{
    .subscribe((result)=>{
    console.log("getuser:",result);
   this.getUserData=result;
   this.register=new FormGroup({
    firstname: new FormControl(this.getUserData.firstname),
   })
console.log("register",this.register)
  });
}
}
