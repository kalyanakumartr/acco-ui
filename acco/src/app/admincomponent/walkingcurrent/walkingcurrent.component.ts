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


  constructor(private fb: FormBuilder,
    private roomTypeService:GetroomtypeService,
    private registerService:RegisterServiceService,

    ){}
  ngOnInit():void{

  //  this. showRoomType();


    this.walkingCurrentForm = this.fb.group({
      firstname: ['', Validators.required,],
      lastname: ['', Validators.required,],
      email: ['', Validators.required,],
      phonenumber: ['', Validators.required,],
      address1: ['', Validators.required,],
      address2: ['', Validators.required,],
      city: ['', Validators.required,],
      state: ['', Validators.required,],
      country: ['', ],
      from:['',],
      to:['',],
      adult:['',],
      children:['',],
      roomtype:['',],
      roleid:3
     
      
     
    });
    // this.passDateTime();
  }
  // min:any="2023-12-06T05.56";
    
 
  

  //   passDateTime(){
  //     var tdate = new Date();
  //     var date:any = tdate.getDate();
  //     if(date < 10){
  //       date = "0" + date;
  //     }
  //     var month:any = tdate.getMonth() + 1;
  //     if(month < 10){
  //      month = "0" + month; 
  //     }
  //     var year:any = tdate.getFullYear();
  //     var hours:any = tdate.getHours();
  //     var minutes:any = tdate.getMinutes();
  //     this.min = year + "-" + month + "-" + date + "T" + hours + ":" + minutes;

  //   }
  //   values: any;
  //   onChange(value:any){

  //   var todate:any = new Date().getTime();
  //   var selectDate:any = new Date(value).getTime();
  //   if(todate > selectDate){
  //     this.values = "";

  //   }
  
  // }
  


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
      this.newuser.username = formData.username;
      this.newuser.roleid=formData.roleid;
      
      this.booking.checkin=formData.from;
      this.booking.checkout=formData.to;
      this.booking.adults=formData.adult;
      this.booking.child=formData.children;
      this.booking.roomtype=formData.roomtype;

      if(this.walkingCurrentForm.valid){
        
        console.log(this.newuser);
        console.log(this.booking);

        // this.registerService.register(this.newuser).    
        // subscribe( result=>{
        //   console.log(result);
        //   this.walkingCurrentForm.reset();
        // })
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





// showRoomType(){
//   this.roomTypeService.getRoomType()
//   // .subscribe((res)=>{
//     .subscribe((result)=>{
//     console.log("roomtype:",result);    
//      this. visibleRoom=result;
//      console.log("walkingcurrent",this.visibleRoom);
//   });

// }

}






