import { Component, OnInit } from '@angular/core';
import { ProfiledetailsComponent } from '../profiledetails/profiledetails.component';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { MybookingsComponent } from '../mybookings/mybookings.component';
import { BookingServiceService } from 'src/app/services/booking-service.service';
import { ActivatedRoute, Params } from '@angular/router';
import { GetUserServiceService } from 'src/app/services/get-user-service.service';

@Component({
  selector: 'app-bookingdetails',
  templateUrl: './bookingdetails.component.html',
  styleUrls: ['./bookingdetails.component.scss']
})
export class BookingdetailsComponent implements OnInit{
  loginData:any;
  bookedData:any
firstname:any;
subscription: any;
  bookingid:any;
  bookingData:any;
  bookingdata:any
  constructor(public authService:AuthServiceService,
    public bookingService: BookingServiceService,
    // private homeroute: ActivatedRoute,
    private getuserservice: GetUserServiceService,
    ){
      authService.apiData$.subscribe(data => this.loginData = data)
      // getuserservice.apiData$.subscribe(data => this.bookingdata = data)
    }

  ngOnInit(): void {
     this.firstname=this.loginData.firstname;
     this.subscription = this.bookingService.currentValue.subscribe(data => {
      this.bookingData = data;
      console.log("booked data", this.bookingData);     
       console.log("booked data", this.bookingData.adults); 
       console.log("booked data", this.bookingData.child); 
      //  console.log("booked data", this.bookingData.child);  
       console.log("type",this.bookingData.roomtypeid);
    })
   
  }
  
}
