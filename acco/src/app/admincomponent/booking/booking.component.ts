

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { BookingServiceService } from 'src/app/services/booking-service.service';
import Swal from 'sweetalert2';
import { DatePipe, formatCurrency } from '@angular/common';
import { BookingModel } from 'src/app/model/booking.model';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  
})
export class BookingComponent implements OnInit{
  bookingForm!:FormGroup;
  booking = new BookingModel();
  submitted = false;

  //  maxDate:any
  //  maxDate:any=this.datepipe.transform(new Date(),'YYYY-MM-dd | HH:mm')
  // selectdate:any=this.datepipe.transform(new Date(),'YYYY-MM-dd | HH:mm');
 
 

  constructor(private fb: FormBuilder,private http: HttpClient,private router: Router,private bookingService:BookingServiceService){}
  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      
      
      firstName: ['', Validators.required,Validators.pattern('^[a-zA-Z]+$'),Validators.maxLength(10)],
      lastName: ['', Validators.required,Validators.pattern('^[a-zA-Z]+$'),Validators.maxLength(10)],
      email: ['', Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")], 
      phonenumber: ['', Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")] ,
      address1: ['', Validators.required,Validators.pattern('^[a-zA-Z]+$')],
      address2: ['', Validators.required,Validators.pattern('^[a-zA-Z]+$')],
      city: ['', Validators.required,Validators.pattern('^[a-zA-Z]+$')],
      state: ['', Validators.required,Validators.pattern('^[a-zA-Z]+$')],
      country: ['', Validators.required,Validators.pattern('^[a-zA-Z]+$')],
     pincode:['',Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
     from:['',Validators.required],
     to: ['',Validators.required],
          adults:['',Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
     children: ['',Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
  roomtype:['',Validators.required],
      
      
    });
  }
  bookingFormProcess(){
    const newbooking = new BookingModel() ;
    const formData = this.bookingForm.value;
    newbooking.firstName = formData.firstName;
      newbooking.lastName = formData.lastname;
      newbooking.email = formData.email;
      newbooking.phonenumber = formData.phonenumber;
      newbooking.address1 = formData.address1;
      newbooking.address2 = formData.address2;
      newbooking.city = formData.city;
      newbooking.state = formData.state;
      newbooking.country = formData.country;
      newbooking.pincode = formData.pincode;
      newbooking.checkin = formData.checkin;
      newbooking.checkout= formData.checkout;
            newbooking.adults = formData.adults;
            newbooking.children = formData.child;
            newbooking.roomtype = formData.roomtype;
        
             // Swal.fire("Success");
  if(this.bookingForm.valid){
    console.log(newbooking);

    this.bookingService.booking(newbooking).    
    subscribe( result=>{
     
       console.log(result);
        // alert("login sucessful"); 
        this.bookingForm.reset();
        Swal.fire(" Booked Successfully");
      
        
        // this.router.navigate(["signup"])
     
    })
  }
    }



}

    // private fb: FormBuilder,
    // private http: HttpClient, 
    // private router: Router,
    // private bookingService:BookingServiceService){
    //   const current = new Date
    //   this.maxDate={
    //     year: current.getFullYear(),
    //     month: current.getMonth() ,
    //     day: current.getDate()+1,

    //     };
    


// reset(){
  
//     this.reset();
 
// }

// bookProcess(){
//   // Swal.fire("Success");
//   if(this.bookingForm.valid){
//     this.bookingService.booking(this.bookingForm.value).subscribe((result)=>{
//        if(result.message){

//          console.log(result.message);
        
//         // alert("login sucessful"); 
//         Swal.fire(result.message);
//         this.bookingForm.reset();
//          this.router.navigate(["home"])
//       }else{
//         Swal.fire("Invalid");
//       }
//     })
//   }
// }
