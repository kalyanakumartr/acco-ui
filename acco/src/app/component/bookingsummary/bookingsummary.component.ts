import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GetRoomList } from 'src/app/model/getroomlist.model';
import { BookingModel } from 'src/app/model/booking.model';

@Component({
  selector: 'app-bookingsummary',
  templateUrl: './bookingsummary.component.html',
  styleUrls: ['./bookingsummary.component.scss']
})
export class BookingsummaryComponent implements OnInit {
  @Input()
  getroomdetails!: BookingModel;
 
  bhk: any;
  roomid:any;
  days: any;
  amount: any;
  in: any;
  out: any;
  adult: any;
  total: any;
  child:any;
  roomtype:any;
  childAge:any=[];
   bookingData:any;
  

  constructor(
    private homeroute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

     this.bookingData=new BookingModel();
    this.homeroute.params.subscribe((params: Params) =>
      this.bookingData = params[('roomBookingSummary')],);
      console.log("aaaaaa",this.bookingData)
     
     
         // this.homeroute.params.subscribe((params: Params) =>
    //   this.bhk = params[('name')],);
    // this.homeroute.params.subscribe((params: Params) =>
    //   this.amount = params[('price')],);
    // this.homeroute.params.subscribe((params: Params) =>
    //   this.days = params[('nodays')],);
    this.homeroute.params.subscribe((params: Params) =>
      this.in = params[('checkIn')],);
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
    console.log("checkIn:", this.in);
    // console.log("checkOut:", this.out);
    // console.log("persons:", this.adult);
    // console.log("child&age:", this.child,this.childAge);
    
  }

  confirmBooking() {
    this.router.navigate(["stepper", {
      "roomid": this.roomid,
      "noofbhk": this.bhk,
      "days": this.days,
      "adult": this.adult,
      "cIn": this.in,
      "cOut": this.out,
      "price":this.amount,
      "child":this.child,
      "childage":this.childAge,
      "roomtype":this.roomtype
    }]);
  }
}




