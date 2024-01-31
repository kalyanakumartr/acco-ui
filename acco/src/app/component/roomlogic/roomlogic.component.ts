import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookingModel } from 'src/app/model/booking.model';
import { BookingServiceService } from 'src/app/services/booking-service.service';
import { GetroomlistService } from 'src/app/services/getroomlist.service';

@Component({
  selector: 'app-roomlogic',
  templateUrl: './roomlogic.component.html',
  styleUrls: ['./roomlogic.component.scss']
})
export class RoomlogicComponent {

  roomData: any
  subscription: any;
  bookingData: any;
  optiontype: any;
  roomBookingSummary:any;

  constructor(
    private getroomlistservice: GetroomlistService,
    private router: Router,
    public bookingService: BookingServiceService

  ) {
    getroomlistservice.apiRoom$.subscribe(data => this.roomData = data)
  }

  ngOnInit(): void {

    console.log("room:", this.roomData);
    this.subscription = this.bookingService.currentValue.subscribe(data => {
      this.bookingData = data;
      console.log("booked data", this.bookingData);
      console.log("booked data", this.bookingData.checkin);

    })
    this.optiontype = this.roomData.optiontype == "R1" ? "Our Recommendation" : "Your Choice";
  }


  sendbookeddata(data: any) {
    console.log("recieved", data);
    console.log("recieved", data.totalamount);
    this. roomBookingSummary= new BookingModel();
    this. roomBookingSummary.checkin=this.bookingData.checkin;
    this.roomBookingSummary.checkout=this.bookingData.checkout;
    this.roomBookingSummary.noofdays=this.bookingData.noofdays;
    this.roomBookingSummary.adults=this.bookingData.adults;
    this.roomBookingSummary.child=this.bookingData.child;
    this.roomBookingSummary.roomtype=this.bookingData.roomtype;
    this.roomBookingSummary.childage=this.bookingData.childage==undefined?0:this.bookingData.childage;;
    this.roomBookingSummary.bhk1count=data.bhktype1;
    this.roomBookingSummary.bhk2count=data.bhktype2;
    this.roomBookingSummary.bhk3count=data.bhktype3;
    this.roomBookingSummary.extrabed=data.bed;
    this.roomBookingSummary.discount=0;
    this.roomBookingSummary.maintenance=0;
    this.roomBookingSummary.price=data.Price*this.bookingData.noofdays;
    this.roomBookingSummary.tax=0;
    this.roomBookingSummary.totalamount=this.roomBookingSummary.price+this.roomBookingSummary.tax;
    this.bookingService.changeMessage(this.roomBookingSummary);
    this.router.navigate(["bookingsummary",

    ]);
  }
}




