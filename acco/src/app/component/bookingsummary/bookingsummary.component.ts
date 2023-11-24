import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GetRoomList } from 'src/app/model/getroomlist.model';

@Component({
  selector: 'app-bookingsummary',
  templateUrl: './bookingsummary.component.html',
  styleUrls: ['./bookingsummary.component.scss']
})
export class BookingsummaryComponent implements OnInit{
  data:any;
  name:any;
  days:any;
  amount:any;
  in:any;
  out:any;
  adult:any;
  constructor(
    private homeroute: ActivatedRoute,
    ){}
    
  ngOnInit(): void {
    this.homeroute.params.subscribe((params: Params) =>
     this.data = params[('id')], );
     this.homeroute.params.subscribe((params: Params) =>
     this.name = params[('name')], );
     this.homeroute.params.subscribe((params: Params) =>
     this.amount = params[('price')], );
     this.homeroute.params.subscribe((params: Params) =>
     this.days = params[('nodays')], );
     this.homeroute.params.subscribe((params: Params) =>
     this.in = params[('checkIn')], );
     this.homeroute.params.subscribe((params: Params) =>
     this.out = params[('checkOut')], );
     this.homeroute.params.subscribe((params: Params) =>
     this.adult = params[('adult')], );
     
     console.log("data:",this.data);
     console.log("name:",this.name);
     console.log("nofdays:",this.days);
     console.log("amount:",this.amount);
     console.log("checkIn:",this.in);
     console.log("checkOut:",this.out);
     console.log("persons:",this.adult);
    }
  }

 


