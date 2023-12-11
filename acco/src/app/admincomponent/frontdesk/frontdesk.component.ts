import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-frontdesk',
  templateUrl: './frontdesk.component.html',
  styleUrls: ['./frontdesk.component.scss']
})
export class FrontdeskComponent implements OnInit {
TodayDate="2022-12-11";
date1=new Date();
currentDate: any = new Date();
currentyear=this.date1.getUTCFullYear();
currentmonth=this.date1.getUTCMonth() +1;
currentday=this.date1.getUTCDate();
finalmonth:any;
finalday:any;
constructor(){

}

ngOnInit(): void {
  if(this.currentmonth<10){
    this.finalmonth="0" +this.currentmonth;
  }else{
    this.finalmonth=this.currentmonth;
  }
  if(this.currentday<10){
    this.finalday="0" +this.currentday ;
  }else{
    this.finalday=this.currentday;
  }
  this.TodayDate=this.currentyear +"-"+this.finalmonth +"-"+this.finalday ;
}
}
