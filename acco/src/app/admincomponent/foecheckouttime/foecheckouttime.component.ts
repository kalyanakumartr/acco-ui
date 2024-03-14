import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { BookingServiceService } from 'src/app/services/booking-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-foecheckouttime',
  templateUrl: './foecheckouttime.component.html',
  styleUrls: ['./foecheckouttime.component.scss']
})
export class FoecheckouttimeComponent implements OnInit {
  selectRoomForm!:FormGroup
  bookingid:any;

  date1 = new Date();
  currentyear = this.date1.getUTCFullYear();
  currentmonth = this.date1.getUTCMonth() + 1;
  currentday = this.date1.getUTCDate();
  checkoutday = this.date1.getDate() + 1;
  currentmin = this.date1.getMinutes();
  currenthour = this.date1.getHours();
  Todaydate = "2023-03-12"

  finalmonth: any;
  finalday: any;
  finalOutday: any;

  constructor( 
    private homeroute: ActivatedRoute,
    private fb: FormBuilder,
    private getbookingservice:BookingServiceService,
    private router:Router
    // private getguestdetail:GetguestdetailService,private router: Router,
    // private _changeDetectorRef: ChangeDetectorRef,
    ){
    // getguestdetail.getGuest$.subscribe(res => this.guestData = res);
    // console.log(this.guestData)
    
  }

  ngOnInit(): void {
    this.homeroute.params.subscribe((params: Params) =>
      this.bookingid = params[('bookingid')],);
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
      if (this.checkoutday < 10) {
        this.finalOutday = "0" + this.checkoutday;
      } else {
        this.finalOutday = this.checkoutday;
      }
  
      this.Todaydate = this.currentyear + "-" + this.finalmonth + "-" + this.finalday + " " + this.currenthour + ":" + this.currentmin;


      this.selectRoomForm= this.fb.group({
        bookingid: [this.bookingid,Validators.required],
        checkout:['',Validators.required],
       
      })
  }

  roomCheckOut(){
    this.getbookingservice.checkOut(this.bookingid,this.Todaydate).subscribe(result=>{
      console.log("res",result);
    // this.selectRoomForm.reset();
   
      Swal.fire({
        confirmButtonColor: '#964B00',
        background:'#efc96a',
        text:result.message,
      });

      // this.router.navigate(["frontdesk"]);
    })
  }
}
