import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GetRoomList } from 'src/app/model/getroomlist.model';
import { BookingModel } from 'src/app/model/booking.model';
import { Subscription } from 'rxjs';
import { BookingServiceService } from 'src/app/services/booking-service.service';

@Component({
  selector: 'app-bookingsummary',
  templateUrl: './bookingsummary.component.html',
  styleUrls: ['./bookingsummary.component.scss']
})
export class BookingsummaryComponent implements OnInit {
  @Input()
  // getroomdetails!: BookingModel;
 
  // bhk: any;
  // roomid:any;
  // days: any;
  // amount: any;
  // in: any;
  // out: any;
  // adult: any;
  // total: any;
  // child:any;
  // roomtype:any;
  // childAge:any=[];
   bookingData:any;

  subscription!:Subscription;
  totalwithalladded:any
  roomBookingSummary:any;
  totPricewithDays:any;

  constructor(
    private homeroute: ActivatedRoute,
    private router: Router,
    public bookingservice:BookingServiceService
    
  ) { }

  ngOnInit(): void {

     this.bookingData=new BookingModel();
     this.subscription =this.bookingservice.currentValue.subscribe(data=>{
      this.bookingData=data;
      console.log("booked data",this.bookingData);
      console.log("booked data",this.bookingData.checkin);
      console.log("booked amount",this.bookingData.totalamount);
      console.log("mode",this.bookingData.modeoftypeid);


     })

    // this.homeroute.params.subscribe((params: Params) =>
    //   this.bookingData = params[('roomBookingSummary')],);
    //   console.log("aaaaaa",this.bookingData)
     
     
         // this.homeroute.params.subscribe((params: Params) =>
    //   this.bhk = params[('name')],);
    // this.homeroute.params.subscribe((params: Params) =>
    //   this.amount = params[('price')],);
    // this.homeroute.params.subscribe((params: Params) =>
    //   this.days = params[('nodays')],);
    // this.homeroute.params.subscribe((params: Params) =>
    //   this.in = params[('checkIn')],);
    // this.homeroute.params.subscribe((params: Params) =>
    //   this.out = params[('checkOut')],);
    // this.homeroute.params.subscribe((params: Params) =>
    //   this.adult = params[('adult')],);
    // this.homeroute.params.subscribe((params: Params) =>
    //   this.child = params[('child')],);
    // this.homeroute.params.subscribe((params: Params) =>
    //   this.childAge = params[('ageChild')],);
    // this.homeroute.params.subscribe((params: Params) =>
    //   this.roomtype = params[('roomtype')],);
    // //  this.total=
    // console.log("data:", this.roomid);
    // console.log("name:", this.bhk);
    // console.log("nofdays:", this.days);
    // console.log("amount:", this.amount);
    // console.log("checkIn:", this.in);
    // console.log("checkOut:", this.out);
    // console.log("persons:", this.adult);
    // console.log("child&age:", this.child,this.childAge);
    // this.totPricewithDays=this.bookingData.price*this.bookingData.nofdays
    // this.totalwithalladded=this.bookingData.totPricewithDays+this.bookingData.tax
 
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
    this.roomBookingSummary.roomtype=this.bookingData.roomtype;
    this.roomBookingSummary.modeoftypeid=this.bookingData.modeoftypeid;
    console.log("=====stepper1111",this.roomBookingSummary.modeoftypeid)


    console.log("=====stepper",this.roomBookingSummary)
    console.log("=====stepper1111",this.roomBookingSummary.modeoftypeid)

    this.bookingservice.changeMessage(this.roomBookingSummary);
    if(this.roomBookingSummary.modeoftypeid==1){
    this.router.navigate(["stepper",  ]);
    }else{
      this.router.navigate(["roomfromwalkin",  ]);
    
    }
  }
}




