import { Component, OnInit } from '@angular/core';
import { ProfiledetailsComponent } from '../profiledetails/profiledetails.component';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { MybookingsComponent } from '../mybookings/mybookings.component';
import { BookingServiceService } from 'src/app/services/booking-service.service';

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
  
  bookingData:any;
  constructor(public authService:AuthServiceService,
    public bookingService: BookingServiceService
    ){
      authService.apiData$.subscribe(data => this.loginData = data)
      // MybookingsComponent.apiData$.subscribe((data: any) => this.bookedData = data)
      
    }

  ngOnInit(): void {
     this.firstname=this.loginData.firstname;
     this.subscription = this.bookingService.currentValue.subscribe(data => {
      this.bookingData = data;
      console.log("booked data", this.bookingData);
       console.log("booked data", this.bookingData.checkin);
       console.log("booked data", this.bookingData.adults);
     


    })
  }
  
}
