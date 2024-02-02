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
  roomBookingSumm:any;

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
      console.log("mode", this.bookingData.modeoftypeid);


    })
    // this.optiontype = this.roomData.optiontype == "R1" ? "Our Recommendation" : "Your Choice";
  }


  sendbookeddata(data: any) {
    console.log("recieved", data);
    console.log("recieved", data.totalamount);
    this. roomBookingSumm= new BookingModel();
    this. roomBookingSumm.checkin=this.bookingData.checkin;
    this.roomBookingSumm.checkout=this.bookingData.checkout;
    this.roomBookingSumm.noofdays=this.bookingData.noofdays;
    this.roomBookingSumm.adults=this.bookingData.adults;
    this.roomBookingSumm.child=this.bookingData.child;
    this.roomBookingSumm.roomtype=this.bookingData.roomtype;
    this.roomBookingSumm.childage=this.bookingData.childage==undefined?0:this.bookingData.childage;;
    this.roomBookingSumm.bhk1count=data.bhktype1;
    this.roomBookingSumm.bhk2count=data.bhktype2;
    this.roomBookingSumm.bhk3count=data.bhktype3;
    this.roomBookingSumm.extrabed=data.bed;
    this.roomBookingSumm.discount=0;
    this.roomBookingSumm.maintenance=0;
    this.roomBookingSumm.price=data.Price*this.bookingData.noofdays;
    this.roomBookingSumm.tax=0;
    this.roomBookingSumm.modeoftypeid=this.bookingData.modeoftypeid;
    this.roomBookingSumm.totalamount=this.roomBookingSumm.price+this.roomBookingSumm.tax;
    this.bookingService.changeMessage(this.roomBookingSumm);
    this.router.navigate(["bookingsummary",

    ]);
  }
}




