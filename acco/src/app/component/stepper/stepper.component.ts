import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookingModel } from 'src/app/model/booking.model';
import { ForOtp } from 'src/app/model/otp.model';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { BookingServiceService } from 'src/app/services/booking-service.service';
import { GenerateOTPService } from 'src/app/services/generate-otp.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent {
  // roomid: any;
  // bhk: any;
  // cin: any;
  // cout: any;
  // adults: any;
  //  price: any;
  // noofdays: any;
  // totalprice:any;
  userId:any;
  verifymsg:any;
  loginData:any;
  name:any;
  // child:any;
  // childAge:any=[];
  // roomtype:any;
  subscription!:Subscription;
  bookingData:any;
  
  constructor(private builder: FormBuilder, 
    private stepperroute: ActivatedRoute,
     private otpService:GenerateOTPService ,
     private bookingService:BookingServiceService,
     public authService:AuthServiceService,
     private router: Router,
    ) {
      authService.apiData$.subscribe(data => this.loginData = data)
     }
  isLinear = true;

  ngOnInit(): void {
   this. name=this.loginData.username
   console.log(this.name)
   this.userId=this.loginData.userid
   this.bookingData=new BookingModel();
   this.subscription =this.bookingService.currentValue.subscribe(data=>{
    this.bookingData=data;
    console.log("booked data",this.bookingData);
    console.log("booked data",this.bookingData.checkin);
    console.log("booked data tot",this.bookingData.price);
    console.log("booked data bhk2",this.bookingData.bhk2count);
    console.log("booked data bhk3",this.bookingData.bhk3count);
    console.log("booked data bhk3",this.bookingData.childage);
  })

    // this.stepperroute.params.subscribe((params: Params) =>
    //   this.roomid = params[('roomid')],);
    // this.stepperroute.params.subscribe((params: Params) =>
    //   this.bhk = params[('noofbhk')],);
    // this.stepperroute.params.subscribe((params: Params) =>
    //   this.cin = params[('cIn')],);
    // this.stepperroute.params.subscribe((params: Params) =>
    //   this.cout = params[('cOut')],);
    // this.stepperroute.params.subscribe((params: Params) =>
    //   this.adults = params[('adult')],);
    // this.stepperroute.params.subscribe((params: Params) =>
    //   this.noofdays = params[('days')],);
    // this.stepperroute.params.subscribe((params: Params) =>
    //   this.price = params[('price')],);
    // this.stepperroute.params.subscribe((params: Params) =>
    //   this.child = params[('child')],);
    // this.stepperroute.params.subscribe((params: Params) =>
    //   this.childAge = params[('childage')],);
    // this.stepperroute.params.subscribe((params: Params) =>
    //   this.roomtype= params[('roomtype')],);
    // this.totalprice=this.noofdays*this.price;
       

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
    newotp.otptype="email"
        this.otpService.genOTP(newotp).    
      subscribe( result=>{
             console.log(result);
          // console.log(result[0].user);
          // this.userId=result[0].user;
          // console.log("id:",this.userId)
          Swal.fire({
            text:
            " OTP generated Successfully",           
            confirmButtonColor: '#964B00',
            background:'#efc96a',
          });
        
          
          // this.router.navigate(["signup"])
       
      })
    
  }

  verifyOTP(){
    const verifyotp = new ForOtp() ;
    const basic= this.Basicform.value
    verifyotp.inputotp=basic.otp;
    verifyotp.userid=this.userId;
    
    console.log(verifyotp)
    this.otpService.verifyOTP(verifyotp).    
      subscribe( res=>{
                   console.log(res);
                   this.verifymsg=res;
                   console.log(this.verifymsg.message);
                   if(this.verifymsg.status==true){
                    Swal.fire(this.verifymsg.message); 
                   
                   }else{
                    Swal.fire(this.verifymsg.message); 
                   }
                  
         
      }      
      )
  }


  confirmBooking(){
    const book = new BookingModel() ;
    const basic= this.Basicform.value
    // book.roomid=this.roomid;
    // book.roombhk=this.bhk;
    book.userid=this.userId;
    book.bhk2count=this.bookingData.bhk2count;
    book.bhk3count=this.bookingData.bhk3count;
    book.firstname=this.loginData.username;
    book.email=this.loginData.email
    book.phonenumber=this.loginData.phonenumber;    
    book.checkin=this.bookingData.checkin;
    book.checkout=this.bookingData.checkout;
    book.adults= this.bookingData.adults;
    book.child=this.bookingData.child;
    book.childage=this.bookingData.childage;
    book.roomtype=this.bookingData.roomtype;
    book.noofdays=this.bookingData.noofdays;
    book.price=this.bookingData.price;
    book.tax=this.bookingData.tax;
    book.totalprice=this.bookingData.price;
    // book.totalprice=this.totalprice;
    book.name=this.loginData.username
    
    
   
   
    
    console.log(book);
    this.bookingService.booking(book).    
    subscribe( result=>{
            console.log(result);              
        Swal.fire(" Booked Successfully");
        this.router.navigate(["home"]);
    })
  }
}