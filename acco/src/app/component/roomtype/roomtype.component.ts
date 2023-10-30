import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-roomtype',
  templateUrl: './roomtype.component.html',
  styleUrls: ['./roomtype.component.scss']
})
export class RoomtypeComponent implements OnInit {
  constructor(){}
  ngOnInit(): void {
    
  }
  inputnumber = 0;
  number = 0;
  bednumber = 0;
  foodnumber = 0;
  
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
