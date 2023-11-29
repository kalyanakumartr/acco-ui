import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { BookingModel } from 'src/app/model/booking.model';
import { ForOtp } from 'src/app/model/otp.model';
import { BookingServiceService } from 'src/app/services/booking-service.service';
import { GenerateOTPService } from 'src/app/services/generate-otp.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent {
  roomid: any;
  bhk: any;
  cin: any;
  cout: any;
  adults: any;
  price: any;
  noofdays: any;
  totalprice:any;
  

  constructor(private builder: FormBuilder, 
    private stepperroute: ActivatedRoute,
     private otpService:GenerateOTPService ,
     private bookingService:BookingServiceService
    ) { }
  isLinear = true;

  ngOnInit(): void {
    this.stepperroute.params.subscribe((params: Params) =>
      this.roomid = params[('roomid')],);
    this.stepperroute.params.subscribe((params: Params) =>
      this.bhk = params[('noofbhk')],);
    this.stepperroute.params.subscribe((params: Params) =>
      this.cin = params[('cIn')],);
    this.stepperroute.params.subscribe((params: Params) =>
      this.cout = params[('cOut')],);
    this.stepperroute.params.subscribe((params: Params) =>
      this.adults = params[('adult')],);
    this.stepperroute.params.subscribe((params: Params) =>
      this.noofdays = params[('days')],);
    this.stepperroute.params.subscribe((params: Params) =>
      this.price = params[('price')],);
    this.totalprice=this.noofdays*this.price;
        console.log(
      this.roomid,
      this.bhk,
      this.cin,
      this.cout,
      this.adults,
      this.price,
      this.noofdays,
      this.totalprice
    )

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
  get Basicform() {
    return this.Emailcheck.get("EmailVerification") as FormGroup;
  }
  get PaymentForm() {
    return this.Emailcheck.get("Payment") as FormGroup;
  }
  HandleSubmit() {
    if (this.Emailcheck.valid) {
      console.log(this.Emailcheck.value);
    }

  }

  generateOTP(){
    const newotp = new ForOtp() ;
    const basic= this.Basicform.value
    newotp.name=basic.name;
    newotp.phonenumber=basic.phonenumber;
    newotp.email=basic.email;
    
        this.otpService.genOTP(newotp).    
      subscribe( result=>{
             console.log(result);
          
          // this.signupForm.reset();
          Swal.fire(" OTP generated Successfully");
        
          
          // this.router.navigate(["signup"])
       
      })
    
  }

  verifyOTP(){
    const verifyotp = new ForOtp() ;
    const basic= this.Basicform.value
    verifyotp.inputotp=basic.otp;
    verifyotp.userid=16;
    
    console.log(verifyotp)
    this.otpService.verifyOTP(verifyotp).    
      subscribe( result=>{
                   console.log(result);
                  Swal.fire(" OTP verified Successfully"); 
         
      })
  }


  confirmBooking(){
    const book = new BookingModel() ;
    const basic= this.Basicform.value
    book.roomid=this.roomid;
    book.roombhk=this.bhk;
    book.adults=this.adults;
    book.checkin=this.cin;
    book.checkout=this.cout
    book.price=this.price;
    book.noofdays=this.noofdays;
    book.totalprice=this.totalprice;
    book.name=basic.name;
    book.email=basic.email;
    book.phonenumber=basic.phonenumber;
    console.log(book);
    this.bookingService.booking(book).    
    subscribe( result=>{
            console.log(result);              
        Swal.fire(" Booked Successfully");
      
    })
  }
}