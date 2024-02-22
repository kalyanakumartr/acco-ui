import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingModel } from 'src/app/model/booking.model';
import { GetguestdetailService } from 'src/app/services/getguestdetail.service';
import Swal from 'sweetalert2';

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

bookingid:any;
checkin:any;
checkout:any;

constructor( private getguestdetail:GetguestdetailService,private router: Router,){
  // getguestdetail.getGuest$.subscribe(res => this.guestData = res);
  // console.log(this.guestData)
  
}

ngOnInit(): void {
 
  if (this.currentmonth < 10) {
      this.finalmonth = "0" + this.currentmonth;
    } else {
      this.finalmonth = this.currentmonth;
    }
    if (this.currentday < 10) {
      this.finalday = "0" + this.currentday;
    } else {
      this.finalday = this.currentday;
    }
  this.TodayDate=this.currentyear +"-"+this.finalmonth +"-"+this.finalday ;
  this.calggapi(this.TodayDate);
  
}



calggapi(seldate:any){
  console.log("daaaaaa",seldate);
  this.getguestdetail.getGuestData(seldate).subscribe(res=>{
    console.table("0000",res[0]);
    this.guestData=res[0]
    console.log("guestdata",this.guestData);
  });
  //  this.bookingid=this.guestData.bookingid;
  //  this.checkin=this.guestData.checkin;
  //  this.checkout=this.guestData.checkout;
  // this.getroomslist(78,2024-1-19,2024-1-20);
}

getroomslist(bookingid:any,checkin:any,checkout:any){
   this.router.navigate(["selectrooms", 
  {
    "bookingid": bookingid,
    "checkin": checkin,
    "checkout": checkout,
  
   } ])
  // let tmp : any =[];
  // console.log("daaaaaa",bookingid,checkin,checkout);
  // this.getguestdetail.getroomsList(bookingid,checkin,checkout).subscribe(res=>{
  //   console.table("0000",res[0]);
  //   this.roomsListData=res[0];
  //   console.log("roomslistdata",this.roomsListData);
  //   for(let i=0; i < this.roomsListData.length; i++) {
  //     tmp.push({ item_id:this. roomsListData.roomid , item_text: this. roomsListData[i].roomnos[i] });
      
  //   }
  //   return this.dropdownList = tmp;     
    
  // });
  // console.log("dropdownList",this.dropdownList);

}

// bookingRoom(){
//   const book = new BookingModel() ;
//   book.bookingid=this.bookingid;
//   book.checkin=this.checkin;
//   book.checkout=this.checkout;
// console.log("booook",book);
//     // const basic= this.Basicform.value
//   this.getguestdetail.bookRoomList(book).    
//   subscribe( result=>{
//           console.log(result);              
//       Swal.fire({
//         text:
//         " Booked Successfully",          
//         confirmButtonColor: '#964B00',
//         background:'#efc96a',
//     });
//       this.router.navigate(["home"]);
//   })
// }

}
