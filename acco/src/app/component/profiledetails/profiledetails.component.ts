import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
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
  private apiData = new BehaviorSubject<any>(null);
  public apiData$ = this.apiData.asObservable();
  updateForm!:FormGroup;
loginData:any;
userid:any;
getUserData:any;
register:any;
  
  // static apiData$: any;
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



getUser(userid:any){
  this.getuserservice.getUserById(userid)
  // .subscribe((res)=>{
    .subscribe((result)=>{
    console.log("getuser:",result);
   this.getUserData=result[0];
   console.log("email",this.getUserData.email)
this.updateForm.controls['email'].setValue(this.getUserData.email);
this.updateForm.controls['firstname'].setValue(this.getUserData.firstname);
this.updateForm.controls['lastname'].setValue(this.getUserData.lastname);
this.updateForm.controls['address1'].setValue(this.getUserData.address1);
this.updateForm.controls['address2'].setValue(this.getUserData.address2);
this.updateForm.controls['city'].setValue(this.getUserData.city);
this.updateForm.controls['country'].setValue(this.getUserData.country);
this.updateForm.controls['state'].setValue(this.getUserData.state);
this.updateForm.controls['phonenumber'].setValue(this.getUserData.phonenumber);
this.updateForm.controls['username'].setValue(this.getUserData.username);
  });
}


updateProcess(){
  console.log("aaaaaaaaa")
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
// if(this.updateForm.valid){
  console.log("updateeeeeee",);
console.log("update",updateuser);

this.registerService.updateUser(updateuser).    
subscribe( result=>{
 
   console.log(result);
  //  this.setData(result)
    // alert("login sucessful"); 
    this.updateForm.reset();
    Swal.fire({
      text:result.message,
      confirmButtonColor: '#964B00',
      background:'#efc96a',
    });      
    //  this.router.navigate(["login"])
 
})
// }
}
// setData(updateData: any) {
//   this.apiData.next(updateData)
// }

}
