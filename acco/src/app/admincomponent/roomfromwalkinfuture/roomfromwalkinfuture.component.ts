import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookingModel } from 'src/app/model/booking.model';
import { ForOtp } from 'src/app/model/otp.model';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { BookingServiceService } from 'src/app/services/booking-service.service';
import { GenerateOTPService } from 'src/app/services/generate-otp.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roomfromwalkinfuture',
  templateUrl: './roomfromwalkinfuture.component.html',
  styleUrls: ['./roomfromwalkinfuture.component.scss']
})
export class RoomfromwalkinfutureComponent {
  userId: any;
  verifymsg: any;
  loginData: any;
  name: any;
  subscription!: Subscription;
  bookingData: any;
  Basicform: any;

  constructor(private builder: FormBuilder,
    private stepperroute: ActivatedRoute,
    private otpService: GenerateOTPService,
    private bookingService: BookingServiceService,
    public authService: AuthServiceService,
    private router: Router,
  ) {
    authService.apiData$.subscribe(data => this.loginData = data)
  }
  isLinear = true;

  ngOnInit(): void {
    this.name = this.loginData.username
    console.log(this.name)
    this.userId = this.loginData.userid
    this.bookingData = new BookingModel();
    this.subscription = this.bookingService.currentValue.subscribe(data => {
      this.bookingData = data;
      console.log("booked data", this.bookingData);
      console.log("booked data", this.bookingData.checkin);
      console.log("booked data tot", this.bookingData.price);
      console.log("booked data bhk2", this.bookingData.bhk2count);
      console.log("booked data bhk3", this.bookingData.bhk3count);
      console.log("booked data bhk3", this.bookingData.childage);
    })


  }

  Emailcheck = this.builder.group({
    EmailVerification: this.builder.group({
      name: this.builder.control('', Validators.required),
      phonenumber: this.builder.control('', Validators.required),
      email: this.builder.control('', Validators.required),
      otp: this.builder.control('', Validators.required)


    }),
    Payment: this.builder.group({
      payment: this.builder.control('', Validators.required),


    }),
  })
  // get Basicform() {
  //   return this.Emailcheck.get("EmailVerification") as FormGroup;
  // }
  get PaymentForm() {
    return this.Emailcheck.get("Payment") as FormGroup;
  }
  HandleSubmit() {
    if (this.Emailcheck.valid) {
      console.log(this.Emailcheck.value);
    }

  }

  // generateOTP() {
  //   const newotp = new ForOtp();
  //   const basic = this.Basicform.value
  //   newotp.name = basic.name;
  //   newotp.phonenumber = basic.phonenumber;
  //   newotp.email = basic.email;
  //   newotp.otptype = "email"
  //   this.otpService.genOTP(newotp).
  //     subscribe(result => {
  //       console.log(result);
  //       Swal.fire({
  //         text:
  //           " OTP generated Successfully",
  //         confirmButtonColor: '#964B00',
  //         background: '#efc96a',
  //       });



  //     })

  // }

  // verifyOTP() {
  //   const verifyotp = new ForOtp();
  //   const basic = this.Basicform.value
  //   verifyotp.inputotp = basic.otp;
  //   verifyotp.userid = this.userId;

  //   console.log(verifyotp)
  //   this.otpService.verifyOTP(verifyotp).
  //     subscribe(res => {
  //       console.log(res);
  //       this.verifymsg = res;
  //       console.log(this.verifymsg.message);
  //       if (this.verifymsg.status == true) {
  //         Swal.fire(this.verifymsg.message);

  //       } else {
  //         Swal.fire(this.verifymsg.message);
  //       }


  //     }
  //     )
  // }



  confirmBookingFuture() {
    const book = new BookingModel();
    const walkinuser = JSON.parse(localStorage.getItem('currentuserid') || '{}');
    console.log("walkinusr", walkinuser.firstname);
    // const basic = this.Basicform.value
    book.userid = walkinuser.userid;
    book.bhk1count = this.bookingData.bhk1count;
    book.bhk2count = this.bookingData.bhk2count;
    book.bhk3count = this.bookingData.bhk3count;
    book.firstname = walkinuser.firstname
    book.lastname = walkinuser.lastname == undefined ? 0 : walkinuser.lastname;
    book.address1 = walkinuser.address1 == undefined ? 0 : walkinuser.address1;
    book.address2 = walkinuser.address2 == undefined ? 0 :walkinuser.address2;
    book.city = walkinuser.city == undefined ? 0 : walkinuser.city;
    book.state = walkinuser.state == undefined ? 0 : walkinuser.state;
    book.country = walkinuser.country == undefined ? 0 : walkinuser.country;
    book.pincode = walkinuser.pincode == undefined ? 0 :walkinuser.pincode;
    book.email = walkinuser.email
    book.phonenumber = walkinuser.phonenumber;
    book.checkin = this.bookingData.checkin;
    book.checkout = this.bookingData.checkout;
    book.adults = this.bookingData.adults;
    book.child = this.bookingData.child;
    book.childage = this.bookingData.childage == undefined ? 0 : this.bookingData.childage;
    book.roomtype = this.bookingData.roomtype;
    book.noofdays = this.bookingData.noofdays;
    book.price = this.bookingData.price;
    book.tax = this.bookingData.tax;
    book.bed = this.bookingData.extrabed;
    book.totalprice = this.bookingData.totalamount;
    book.modeoftypeid = this.bookingData.modeoftypeid;

    // book.totalprice=this.totalprice;
    book.name = "0";

    console.log("walkinbook",book);
    this.bookingService.booking(book).
      subscribe(result => {
        console.log(result);
        Swal.fire({
          text:
            " Booked Successfully",
          confirmButtonColor: '#964B00',
          background: '#efc96a',
        });
        this.router.navigate(["frontdesk"]);
      })
  }

}
