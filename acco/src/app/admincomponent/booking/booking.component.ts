
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { BookingServiceService } from 'src/app/services/booking-service.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  
})
export class BookingComponent implements OnInit{
  bookingForm!:FormGroup;
  // maxDate:any
  maxDate:any=this.datepipe.transform(new Date(),'YYYY-MM-dd | HH:mm')
 selectdate:any=this.datepipe.transform(new Date(),'YYYY-MM-dd | HH:mm');
 
 

  constructor(private datepipe:DatePipe,
    private fb: FormBuilder,private http: HttpClient, private router: Router,private bookingService:BookingServiceService){
    //   const current = new Date
    //   this.maxDate={
    //     year: current.getFullYear(),
    //     month: current.getMonth() ,
    //     day: current.getDate()+1,

    //     };
    }
  ngOnInit():void{
    this.bookingForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      pincode: ['', Validators.required],
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
     adult: ['', Validators.required],
     child: ['', Validators.required],
     roomType:['', Validators.required],
    });

}

reset(){
  
    this.reset();
 
}

bookProcess(){
  // Swal.fire("Success");
  if(this.bookingForm.valid){
    this.bookingService.booking(this.bookingForm.value).subscribe((result)=>{
       if(result.message){

         console.log(result.message);
        
        // alert("login sucessful"); 
        Swal.fire(result.message);
        this.bookingForm.reset();
         this.router.navigate(["home"])
      }else{
        Swal.fire("Invalid");
      }
    })
  }
}
}
