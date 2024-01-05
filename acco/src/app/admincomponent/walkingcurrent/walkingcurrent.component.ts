import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { UserModel } from 'src/app/model/auth.model';
import { BookingModel } from 'src/app/model/booking.model';
import { GetroomtypeService } from 'src/app/services/getroomtype.service';
import { RegisterServiceService } from 'src/app/services/register-service.service';


import Swal from 'sweetalert2';


@Component({
  selector: 'app-walkingcurrent',
  templateUrl: './walkingcurrent.component.html',
  styleUrls: ['./walkingcurrent.component.scss']
})
export class WalkingcurrentComponent implements OnInit {
  walkingCurrentForm!:FormGroup;
  user =new UserModel();   
  submitted = false;
  visibleRoom:any;
  formData: any;
   newuser = new UserModel() ;
   booking = new BookingModel();

   Todaydate="2023-03-12"
   outDate="2023-03-12"

  constructor(private fb: FormBuilder,
    private roomTypeService:GetroomtypeService,
    private registerService:RegisterServiceService,

    ){}

    date1=new Date();
    currentyear=this.date1.getUTCFullYear();
    currentmonth=this.date1.getUTCMonth() +1;
    currentday=this.date1.getUTCDate();
    checkoutday=this.date1.getDate() + 1;
    currentmin=this.date1.getMinutes();
    currenthour=this.date1.getHours();
   
    finalmonth:any;
    finalday:any;
    finalOutday:any;
  ngOnInit():void{

   this. showRoomType();
   if(this.currentmonth<10){
    this.finalmonth="0" +this.currentmonth;
  }else{
    this.finalmonth=this.currentmonth;
  }
  if(this.currentday<10){
    this.finalday="0" +this.currentday ;
  }else{
    this.finalday=this.currentday;
  }
  if(this.checkoutday<10){
    this.finalOutday="0" +this.checkoutday ;
  }else{
    this.finalOutday=this.checkoutday;
  }
  
  this.Todaydate=this.currentyear +"-"+this.finalmonth +"-"+this.finalday +" "+this.currenthour+":"+this.currentmin;
  this.outDate=this.currentyear +"-"+this.finalmonth +"-"+this.finalOutday +" "+this.currenthour+":"+this.currentmin;


    this.walkingCurrentForm = this.fb.group({
      firstname: ['', [ Validators.required,Validators.pattern("^[a-zA-Z]{3,15}$")]],
      lastname: ['', Validators.required,],
      email:['',[ Validators.required,Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      phonenumber: ['',[Validators.required,Validators.pattern("^[0-9]{0,10}$")]],
      address1: ['',[ Validators.required,Validators.pattern("^[a-zA-Z0-9,./ ]*$")]],
      address2: ['', Validators.required,],
      city: ['', Validators.required],
      state: ['', Validators.required,],
      country: ['', Validators.required,],
      pincode:['',[Validators.required,Validators.pattern("^[0-9]*$")]],
      from:['',Validators.required,],
      to:['',Validators.required,],
      adult: ['1', [Validators.required,Validators.pattern("^[1-9][0-9]*$")]],
      children:['0',[Validators.required,Validators.max(6)]],
      roomtype:['',Validators.required,],
      roleid:3
     
      
     
    });
    
  }
  


    walkingCurrentFormProcess(){
      
      const formData = this.walkingCurrentForm.value;
      this.newuser.firstname = formData.firstname;
      this.newuser.lastname = formData.lastname;
      this.newuser.email = formData.email;
      this.newuser.phonenumber = formData.phonenumber;
      this.newuser.address1 = formData.address1;
      this.newuser.address2 = formData.address2;
      this.newuser.city = formData.city;
      this.newuser.state = formData.state;
      this.newuser.country = formData.country;
      // this.newuser.username = formData.username;
      this.newuser.roleid=formData.roleid;
      
      this.booking.checkin=formData.from;
      this.booking.checkout=formData.to;
      this.booking.adults=formData.adult;
      this.booking.child=formData.children;
      this.booking.roomtype=formData.roomtype;

      if(this.walkingCurrentForm.valid){
        
        console.log(this.newuser);
        console.log(this.booking);

        this.registerService.register(this.newuser).    
        subscribe( result=>{
          console.log(result);
          this.walkingCurrentForm.reset();
        })
      }
    }

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





showRoomType(){
  this.roomTypeService.getRoomType()
  // .subscribe((res)=>{
    .subscribe((result)=>{
    console.log("roomtype:",result);    
     this. visibleRoom=result;
     console.log("walkingcurrent",this.visibleRoom);
  });

}

}






