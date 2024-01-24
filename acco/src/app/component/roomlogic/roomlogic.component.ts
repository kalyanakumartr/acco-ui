import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookingServiceService } from 'src/app/services/booking-service.service';
import { GetroomlistService } from 'src/app/services/getroomlist.service';

@Component({
  selector: 'app-roomlogic',
  templateUrl: './roomlogic.component.html',
  styleUrls: ['./roomlogic.component.scss']
})
export class RoomlogicComponent {

  roomData:any
  subscription: any;
  bookingData:any;
  optiontype:any;

 constructor(
    private getroomlistservice: GetroomlistService,   
    private router: Router,
    public bookingService:BookingServiceService

  ) {
    getroomlistservice.apiRoom$.subscribe(data => this.roomData = data)
  }

  ngOnInit(): void {

    console.log("room:", this.roomData);
    this.subscription =this.bookingService.currentValue.subscribe(data=>{
      this.bookingData=data;
      console.log("booked data",this.bookingData);
      console.log("booked data",this.bookingData.checkin);

     })
     this. optiontype = this.roomData.optiontype == "R1" ? "Our Recommendation" :"Your Choice" ;
     }


     sendbookeddata(data:any){
      console.log("recieved",data)
     }
    }

    


