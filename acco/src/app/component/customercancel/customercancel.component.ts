import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { BookingModel } from 'src/app/model/booking.model';
import { BookingServiceService } from 'src/app/services/booking-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customercancel',
  templateUrl: './customercancel.component.html',
  styleUrls: ['./customercancel.component.scss']
})
export class CustomercancelComponent {

  bookingid:any;
  checkin!:Date;
  checkout:any;
  userid:any;
  cancelform!:FormGroup;
  cancelpolicydata:any;
  
  constructor(
    private homeroute: ActivatedRoute,
    private fb: FormBuilder,
    private bookingService: BookingServiceService,


  ) { }

  ngOnInit(): void {
    // this.imageUrll='https://www.w3schools.com/images/w3schools_green.jpg';

    // this.getroomslist();
    this.homeroute.params.subscribe((params: Params) =>
      this.bookingid = params[('id')],);

    this.homeroute.params.subscribe((params: Params) =>
      this.checkin = params[('fromdate')],);
      // console.log("type",this.flattype)

    this.homeroute.params.subscribe((params: Params) =>
      this.checkout = params[('todate')],);

      this.homeroute.params.subscribe((params: Params) =>
      this.userid = params[('userid')],);
      // console.log("flatstatus",this.flatstatus)

      this.cancelform = this.fb.group({
        bookingid: [this.bookingid, Validators.required],
        checkin: [this.checkin, Validators.required],
        checkout: [this.checkout, Validators.required],
        reason: ['', Validators.required],
      })

      this.cancellationpolicy();
}

cancelbooking(){

  console.log("cancel");
    const book = new BookingModel();
    const formData = this.cancelform.value;

    book.bookingid = this.bookingid;
    book.userid = this.userid;
    book.commands = formData.reason;
    book.statusid="10";
    console.log("book",book)
    
    this.bookingService.bookingCancel(book).subscribe((result:any) => {
      console.log("res", result);
      // this.cancelResult=result;
      Swal.fire({
        text: result.message,
        confirmButtonColor: '#964B00',
        background: '#efc96a',
      });
    })
}

cancellationpolicy(){
  this.bookingService.getcancelpolicy().subscribe(result => {
    console.log("res", result);
    this.cancelpolicydata=result;
})
}
}