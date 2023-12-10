import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { UserModel } from 'src/app/model/auth.model';

import Swal from 'sweetalert2';



@Component({
  selector: 'app-walkingfuture',
  templateUrl: './walkingfuture.component.html',
  styleUrls: ['./walkingfuture.component.scss']
})
export class WalkingfutureComponent implements OnInit {
  WalkingfutureForm!:FormGroup;
  user =new UserModel();   
  submitted = false;


  constructor(private fb: FormBuilder){}
  ngOnInit():void{
    this.WalkingfutureForm = this.fb.group({
      firstName: ['', Validators.required,Validators.pattern('^[a-zA-Z]+$'),Validators.maxLength(10)],
      lastName: ['', Validators.required,Validators.pattern('^[a-zA-Z]+$'),Validators.maxLength(10)],
      email: ['', Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
      phonenumber: ['', Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
      address1: ['', Validators.required,Validators.pattern('^[a-zA-Z]+$')],
      address2: ['', Validators.required,Validators.pattern('^[a-zA-Z]+$')],
      city: ['', Validators.required,Validators.pattern('^[a-zA-Z]+$')],
      state: ['', Validators.required,Validators.pattern('^[a-zA-Z]+$')],
      country: ['', Validators.required,Validators.pattern('^[a-zA-Z]+$')],
      username: ['', Validators.required,Validators.pattern('^[a-zA-Z]+$'),Validators.maxLength(10)],
      password: ['', Validators.required,Validators.pattern('^[a-zA-Z]+$'),Validators.maxLength(10)],
      confirmpassword: ['', Validators.required,Validators.pattern('^[a-zA-Z]+$'),Validators.maxLength(10)],
     roleid:4
      
     
    });
    this.passDateTime();
  }
  min:any="2023-12-06T05.56";
    
 
  

    passDateTime(){
      var tdate = new Date();
      var date:any = tdate.getDate();
      if(date < 10){
        date = "0" + date;
      }
      var month:any = tdate.getMonth() + 1;
      if(month < 10){
       month = "0" + month; 
      }
      var year:any = tdate.getFullYear();
      var hours:any = tdate.getHours();
      var minutes:any = tdate.getMinutes();
      this.min = year + "-" + month + "-" + date + "T" + hours + ":" + minutes;

    }
    values: any;
    onChange(value:any){

    var todate:any = new Date().getTime();
    var selectDate:any = new Date(value).getTime();
    if(todate > selectDate){
      this.values = "";

    }
  
  }
  


    WalkingfutureFormProcess(){
      const newuser = new UserModel() ;
      const formData = this.WalkingfutureForm.value;
      newuser.firstname = formData.firstname;
      newuser.lastname = formData.lastname;
      newuser.email = formData.email;
      newuser.phonenumber = formData.phonenumber;
      newuser.address1 = formData.address1;
      newuser.address2 = formData.address2;
      newuser.city = formData.city;
      newuser.state = formData.state;
      newuser.country = formData.country;
      newuser.username = formData.username;
      newuser.password = formData.password;
      newuser.cpassword = formData.confirmpassword;
      newuser.roleid=formData.roleid;
      // Swal.fire("Success");
  // if(this.walkingcurrentForm.valid){
  //   console.log(this.user);

  //   this.WalkingcurentService.register(newuser).    
  //   subscribe( result=>{
     
  //      console.log(result);
  //       // alert("login sucessful"); 
  //       this.WalkincurrentForm.reset();
  //       Swal.fire(" Registered Successfully");
      
        
  //       // this.router.navigate(["signup"])
     
  //   })
  // }
  //   }



}


}



