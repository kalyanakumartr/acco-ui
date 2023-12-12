import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GetchargedamenityService } from 'src/app/services/getchargedamenity.service';
import { GetroomlistService } from 'src/app/services/getroomlist.service';

@Component({
  selector: 'app-roomtype',
  templateUrl: './roomtype.component.html',
  styleUrls: ['./roomtype.component.scss']
})
export class RoomtypeComponent implements OnInit {
  //  @Input() fd: any;

  roomData:any;
  chargedData:any;
  days: any;
  adult:any;
  cIn:any;
  cOut:any;
  selectedRow: any;
selectedAll: boolean = false;

  constructor(
    private getroomlistservice:GetroomlistService,
    private getChargedAmenity:GetchargedamenityService,
    private homeroute: ActivatedRoute,
    private router: Router,

    ){
      this.selectedRow = [];
    getroomlistservice.apiRoom$.subscribe(data => this.roomData = data)
  }
  ngOnInit(): void {
   console.log("room:",this.roomData) ;
   this.getChargedAmenities();
   
    this.homeroute.params.subscribe((params: Params) =>
     this.days = params[('days')], );    
     this.homeroute.params.subscribe((params: Params) =>
     this.adult = params[('adult')], );
     this.homeroute.params.subscribe((params: Params) =>
     this.cIn = params[('cIn')], );
     this.homeroute.params.subscribe((params: Params) =>
     this.cOut = params[('cOut')], );
   
     
    console.log("days:",this.days)
    console.log("adult:",this.adult)
    console.log("cIn:",this.cIn)
    console.log("cOut:",this.cOut)
    
  }
  inputnumber = 0;
  number = 0;
  bednumber = 0;
  foodnumber = 0;

  getChargedAmenities(){
  this.getChargedAmenity.getChargedData().subscribe((res)=>{
    console.log(res);
    this.chargedData=res;
            console.log("++++chargedData:",this.chargedData);
    
  });
}


selectAll(index: any) {
  if (typeof (index) == 'undefined') {
   this.selectedAll = !this.selectedAll;
   this.selectedRow = [];
  } else {
   this.selectedRow.push(index);
   console.log("rooooom",this.selectedRow);
  }
 }

sendbookeddata(data:any){
console.log(data)
 this.router.navigate(["bookingsummary",{"id":data.roomid,
 "name":data.roomname,
 "price":data.price,
 "nodays":this.days,
 "checkIn":this.cIn,
 "checkOut":this.cOut,
"adult":this.adult
}]);

}
  
  plus()
  {
    if(this.inputnumber<6){
    
   this.inputnumber = this.inputnumber+1;
    }
  }
  plus1()
  {
    if(this.number<6){
      this.number = this.number+1;
    }
    
  }
  plus2()
  {
   
    if(this.bednumber<6){
      this.bednumber = this.bednumber+1;
    }
  }
    plus3()
    {
      if(this.foodnumber<12){
        this.foodnumber = this.foodnumber+1;
      }
    }

    minus()
  {
    if(this.inputnumber != 0)
  {
   this.inputnumber = this.inputnumber-1;
  }
  
  
  }
  minus1()
  {
    if(this.number !=0) 
  {
    this.number = this.number-1;
  }
  

  }
  minus2()
  {
    
  if(this.bednumber !=0)
  {
    this.bednumber = this.bednumber-1;
  }

  }
  minus3()
  {
    if(this.foodnumber !=0)
    {
      this.foodnumber = this.foodnumber-1;
    }
  }
  

  
  



}
