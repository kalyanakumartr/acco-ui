import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GetRoomList } from 'src/app/model/getroomlist.model';
import { BookingModel } from 'src/app/model/booking.model';
import { Subscription } from 'rxjs';
import { BookingServiceService } from 'src/app/services/booking-service.service';


@Component({
  selector: 'app-foebookingsummary',
  templateUrl: './foebookingsummary.component.html',
  styleUrls: ['./foebookingsummary.component.scss']
})
export class FoebookingsummaryComponent {
  @Input()
  bookingData: any;

  subscription!: Subscription;
  totalwithalladded: any
  roomBookingSummary: any;
  totPricewithDays: any;

  constructor(
    private homeroute: ActivatedRoute,
    private router: Router,
    public bookingservice: BookingServiceService

  ) { }

  ngOnInit(): void {

    this.bookingData = new BookingModel();
    this.subscription = this.bookingservice.currentValue.subscribe(data => {
      this.bookingData = data;
      console.log("booked data", this.bookingData);
      console.log("booked data", this.bookingData.checkin);
      console.log("booked amount", this.bookingData.totalamount);
      console.log("mode", this.bookingData.modeoftypeid);
      console.log("roomtype", this.bookingData.roomtypeid);


    })

  }

  confirmBooking() {
    this. roomBookingSummary= new BookingModel();
    this. roomBookingSummary.checkin=this.bookingData.checkin;
    this.roomBookingSummary.checkout=this.bookingData.checkout;
    this.roomBookingSummary.noofdays=this.bookingData.noofdays;
    this.roomBookingSummary.adults=this.bookingData.adults;
    this.roomBookingSummary.child=this.bookingData.child;
    this.roomBookingSummary.childage=this.bookingData.childage;
    this.roomBookingSummary.bhk1count=this.bookingData.bhk1count;
    this.roomBookingSummary.bhk2count=this.bookingData.bhk2count;
    this. roomBookingSummary.bhk3count=this.bookingData.bhk3count;
    this.roomBookingSummary.extrabed=this.bookingData.extrabed;
    this.roomBookingSummary.totalamount=this.bookingData.totalamount;
    // this.roomBookingSummary.totalbedamount=this.bookingData.totalbedamount;
    this.roomBookingSummary.tax=this.bookingData.tax;
    this.roomBookingSummary.maintenance=this.bookingData.maintenance;
    this.roomBookingSummary.discount=this.bookingData.discount;
    this.roomBookingSummary.price=this.bookingData.price;   
    this.roomBookingSummary.roomtypeid=this.bookingData.roomtypeid;
    this.roomBookingSummary.modeoftypeid=this.bookingData.modeoftypeid;
    console.log("=====stepper1111",this.roomBookingSummary.modeoftypeid)
    console.log("=====stepper1111222222",this.roomBookingSummary.roomtypeid)

    console.log("=====stepper",this.roomBookingSummary)
    console.log("=====stepper1111",this.roomBookingSummary.modeoftypeid)

    this.bookingservice.changeMessage(this.roomBookingSummary);
    if(this.roomBookingSummary.modeoftypeid==1){
    this.router.navigate(["stepper",  ]);
    }else  if(this.roomBookingSummary.modeoftypeid==2){
      this.router.navigate(["roomfromwalkin",  ]);
    
    }else  {
      this.router.navigate(["roomfromwalkinfuture",  ]);
    
    }
  }


}
