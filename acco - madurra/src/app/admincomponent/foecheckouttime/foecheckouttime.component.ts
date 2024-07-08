import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { EBModel } from 'src/app/model/eb.model';
import { BookingServiceService } from 'src/app/services/booking-service.service';
import { EbreadingService } from 'src/app/services/ebreading.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-foecheckouttime',
  templateUrl: './foecheckouttime.component.html',
  styleUrls: ['./foecheckouttime.component.scss']
})
export class FoecheckouttimeComponent implements OnInit {
  selectRoomForm!:FormGroup
  EBClosingForm!:FormGroup
  bookingid:any;
 statusid=7;
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
  isDisabled: boolean = false;
  roomtypeid:any;
  price:any;
  ebopeningunit:any;

  constructor( 
    private homeroute: ActivatedRoute,
    private fb: FormBuilder,
    private getbookingservice:BookingServiceService,
    private router:Router,
    private getebservice:EbreadingService
    // private getguestdetail:GetguestdetailService,private router: Router,
    // private _changeDetectorRef: ChangeDetectorRef,
    ){
    // getguestdetail.getGuest$.subscribe(res => this.guestData = res);
    // console.log(this.guestData)
    
  }

  ngOnInit(): void {
    this.homeroute.params.subscribe((params: Params) =>
      this.bookingid = params[('bookingid')],);
    this.homeroute.params.subscribe((params: Params) =>
      this.roomtypeid = params[('roomtypeid')],);
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

      this.EBClosingForm= this.fb.group({
        bookingid: [this.bookingid,Validators.required],
        closingdate:[this.Todaydate,Validators.required],
       closingunit:['',Validators.required]
      })

      this.getEBPrice();
      this. getEBOpeningUnit();
  }

  roomCheckOut(){
    this.getbookingservice.checkOut(this.bookingid,this.Todaydate,this.statusid).subscribe(result=>{
      console.log("res",result);
    // this.selectRoomForm.reset();
   
      Swal.fire({
        confirmButtonColor: '#964B00',
        background:'#efc96a',
        text:result.message,
      });

      this.router.navigate(["frontdesk"]);
    })
  }


  getEBPrice(){
    this.getebservice.ebPrice()
        // .subscribe((res)=>{
        .subscribe((result) => {
          // console.log("roomtype:", result);
          this.price = result;
          console.log("ebprice", this.price);
          console.log("ebprice", this.price[0].price);
        });
  }


  getEBOpeningUnit(){
    this.getebservice.ebOpeningReading(this.bookingid)
        // .subscribe((res)=>{
        .subscribe((result) => {
          // console.log("roomtype:", result);
          this.ebopeningunit = result;
          console.log("ebopen", this.ebopeningunit);
          console.log("ebopeningunit", this.ebopeningunit[0].openingunit);
        });
  }
  

  EBClosing(){
    const eb = new EBModel();
    const EBData = this.EBClosingForm.value;
    console.log("openunit",EBData.closingdate);
    console.log("opendate",EBData.closingunit);
    console.log("bookingid",EBData.bookingid);

    var total= EBData.closingunit-this.ebopeningunit[0].openingunit
    eb.bookingid=EBData.bookingid;
    eb.closingdate=EBData.closingdate;
    eb.closingunit=EBData.closingunit;
    eb.totalunit=total;
    eb.price=this.price[0].price;
    eb.totalamount=eb.price*eb.totalunit;
    console.log("close",eb);


    this.getebservice.EBClosing(eb).subscribe(result => {
      console.log("res", result);
      this.EBClosingForm.reset();

      Swal.fire({
        confirmButtonColor: '#964B00',
        background: '#efc96a',
        text: result.message,
      });

       this.router.navigate(["frontdesk"]);
    })

  }




}
