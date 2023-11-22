import { Component, Input, OnInit } from '@angular/core';
import { GetchargedamenityService } from 'src/app/services/getchargedamenity.service';
import { GetroomlistService } from 'src/app/services/getroomlist.service';

@Component({
  selector: 'app-roomtype',
  templateUrl: './roomtype.component.html',
  styleUrls: ['./roomtype.component.scss']
})
export class RoomtypeComponent implements OnInit {
  @Input() fd: any;
  roomData:any;
  chargedData:any;
  constructor(
    private getroomlistservice:GetroomlistService,
    private getChargedAmenity:GetchargedamenityService){
    getroomlistservice.apiRoom$.subscribe(data => this.roomData = data)
  }
  ngOnInit(): void {
   console.log("room:",this.roomData) ;
   this.getChargedAmenities();
    console.log("fd :",this.fd);

    
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

sendbookeddata(data:any){
console.log(data)
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
