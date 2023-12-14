import { Component, OnInit } from '@angular/core';
import { GetguestdetailService } from 'src/app/services/getguestdetail.service';

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
guestData:any;


constructor( private getguestdetail:GetguestdetailService){
  // getguestdetail.getGuest$.subscribe(res => this.guestData = res);
  // console.log(this.guestData)
}

ngOnInit(): void {
  this.calggapi(this.TodayDate);
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

calggapi(seldate:any){
  console.log("daaaaaa",seldate);
  this.getguestdetail.getGuestData(seldate).subscribe(res=>{
    console.table("0000",res[0]);
    this.guestData=res[0]
    console.log("guestdata",this.guestData);
  });

}
}
