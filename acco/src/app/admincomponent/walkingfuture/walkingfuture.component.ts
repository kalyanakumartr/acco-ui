import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { UserModel } from 'src/app/model/auth.model';
import { BookingModel } from 'src/app/model/booking.model';
import { BookingServiceService } from 'src/app/services/booking-service.service';
import { EmailcheckService } from 'src/app/services/emailcheck.service';
import { GetroomlistService } from 'src/app/services/getroomlist.service';
import { GetroomtypeService } from 'src/app/services/getroomtype.service';
import { RegisterServiceService } from 'src/app/services/register-service.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-walkingfuture',
  templateUrl: './walkingfuture.component.html',
  styleUrls: ['./walkingfuture.component.scss']
})
export class WalkingfutureComponent implements OnInit {
  walkingFutureForm!:FormGroup;
  user =new UserModel();   
  submitted = false;
  visibleRoom:any;
  formData: any;
  walkinguserFuture = new UserModel() ;
  booking = new BookingModel();
  roomData: any;
  roomBookingSum: any
  userData: any;
  walkingRoomCheckFuture!: FormGroup;
  Todaydate="2023-03-12"
  outDate="2023-03-12"


  constructor(private fb: FormBuilder,
    private roomTypeService:GetroomtypeService,
    private registerService:RegisterServiceService,
    private emailservice: EmailcheckService,
    private router: Router,
    private getroomlistservice: GetroomlistService,
    public bookingService: BookingServiceService

    ){getroomlistservice.apiRoom$.subscribe(data => this.roomData = data)}

    date1=new Date();
    currentyear=this.date1.getUTCFullYear();
    currentmonth=this.date1.getUTCMonth() +1;
    currentday=this.date1.getUTCDate();
    checkoutday=this.date1.getDate() + 1;
    currentmin=this.date1.getMinutes();
    currenthour=this.date1.getHours();
   
    finalmonth:any;
    finalday:any;
    finalOutday:any;
  ngOnInit():void{

    this. showRoomType();
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
  if(this.checkoutday<10){
    this.finalOutday="0" +this.checkoutday ;
  }else{
    this.finalOutday=this.checkoutday;
  }
  
  this.Todaydate=this.currentyear +"-"+this.finalmonth +"-"+this.finalday +" "+this.currenthour+":"+this.currentmin;
  this.outDate=this.currentyear +"-"+this.finalmonth +"-"+this.finalOutday +" "+this.currenthour+":"+this.currentmin;







    this.walkingFutureForm = this.fb.group({
      firstname: ['', [ Validators.required,Validators.pattern("^[a-zA-Z]{3,15}$")]],
      lastname: ['', Validators.required],
      email:['',[ Validators.required,Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      phonenumber: ['',[Validators.required,Validators.pattern("^[0-9]{0,10}$")]],
      address1: ['',[ Validators.required,Validators.pattern("^[a-zA-Z0-9,./ ]*$")]],
      address2: ['', Validators.required,],
      city: ['', Validators.required,],
      state: ['', Validators.required,],
      country: ['', Validators.required,],
      pincode: ['', [Validators.required, Validators.pattern("^[0-9]{6}$")]],
      // from:['',Validators.required],
      // to:['',Validators.required],
      // adults:['',[Validators.required,Validators.pattern("^[0-9]*$")]],
      // children:['0',[Validators.required,Validators.pattern("^[0-9]*$")]],
      // roomtype:['',Validators.required,],
      // roleid:3
     
    });

    this.walkingRoomCheckFuture = this.fb.group({
      checkin: ['', Validators.required,],
      checkout: ['', Validators.required,],
      adult: ['1', [Validators.required, Validators.pattern("^[1-9][0-9]*$")]],
      children: ['0', [Validators.required, Validators.max(6)]],
      roomtype: ['1', Validators.required,],
      roleid: 3

    });
    
  }

   


    walkingFutureFormProcess(){
      const formData = this.walkingFutureForm.value;
      this.walkinguserFuture.firstname = formData.firstname;
      this.walkinguserFuture.lastname = formData.lastname;
      this.walkinguserFuture.email = formData.email;
      this.walkinguserFuture.phonenumber = formData.phonenumber;
      this.walkinguserFuture.address1 = formData.address1;
      this.walkinguserFuture.address2 = formData.address2;
      this.walkinguserFuture.city = formData.city;
      this.walkinguserFuture.state = formData.state;
      this.walkinguserFuture.country = formData.country;
      this.walkinguserFuture.pincode = formData.pincode;
      this.walkinguserFuture.username = "";
    this.walkinguserFuture.password = "";
    this.walkinguserFuture.cpassword = "";
    this.walkinguserFuture.roleid = 3;
    this.walkinguserFuture.modeoftypeid = 3;
      
    if (this.walkingFutureForm.valid) {
      console.log("123", this.walkinguserFuture);
      this.registerService.register(this.walkinguserFuture).
        subscribe(res => {
          console.log("res", res);
          let result = res;
          this.walkingFutureForm.reset();
          Swal.fire({
            text: res.message,
            confirmButtonColor: '#964B00',
            background: '#efc96a',
          });
        })
    }
      }
    
      // Swal.fire("Success");
  // if(this.walkingcurrentForm.valid){
  //   console.log(this.user);

  //   this.WalkingcurentService.register(newuser).    
  //   subscribe( result=>{
     
  //      console.log(result);
  //       // alert("login sucessful"); 
  //       this.WalkincurrentForm.reset();
  //       Swal.fire(" Registered Successfully");
      
        
  //       // this.router.navigate(["signup"])
     
  //   })
  // }
  //   }



  checkphone(value: any) {


    console.log("email", value)
    this.walkingFutureForm.reset();
    Swal.fire({
            text: "Phonenumber not Registered",
            confirmButtonColor: '#964B00',
            background: '#efc96a',
          });
    this.emailservice.emailverify(value).subscribe((result) => {
      this.userData = result[0];
      console.log("userdata", this.userData)
      // Swal.fire(" phonenumber is  register");
      this.walkingFutureForm.controls['email'].setValue(this.userData.email);
      this.walkingFutureForm.controls['firstname'].setValue(this.userData.firstname);
      this.walkingFutureForm.controls['lastname'].setValue(this.userData.lastname);
      this.walkingFutureForm.controls['address1'].setValue(this.userData.address1);
      this.walkingFutureForm.controls['address2'].setValue(this.userData.address2);
      this.walkingFutureForm.controls['city'].setValue(this.userData.city);
      this.walkingFutureForm.controls['state'].setValue(this.userData.state);
      this.walkingFutureForm.controls['country'].setValue(this.userData.country);
      this.walkingFutureForm.controls['pincode'].setValue(this.userData.pincode);
      this.walkingFutureForm.controls['phonenumber'].setValue(this.userData.phonenumber);
      // localStorage.clear();
      localStorage.removeItem('currentuserid');

      const currentuser = new UserModel();
      currentuser.userid = this.userData.userid;
      currentuser.firstname = this.userData.firstname;
      currentuser.lastname = this.userData.lastname;
      currentuser.phonenumber = this.userData.phonenumber;
      currentuser.email = this.userData.email;
      currentuser.pincode = this.userData.pincode;
      currentuser.address1 = this.userData.address1;
      currentuser.address2 = this.userData.address2;
      currentuser.city = this.userData.city;
      currentuser.state = this.userData.state;
      currentuser.country = this.userData.country;


      const jsondata = JSON.stringify(currentuser);
      localStorage.setItem('currentuserid', jsondata);
      Swal.fire({
        text: result.message,
        confirmButtonColor: '#964B00',
        background: '#efc96a',
      });



    })
  }


  walkingFutureRoomCheckProcess() {
    const formData = this.walkingRoomCheckFuture.value;
    this.booking.checkin = formData.checkin;
    this.booking.checkout = formData.checkout;
    this.booking.adults = formData.adult;
    this.booking.child = formData.children;
    this.booking.roomtype = formData.roomtype;
    this.booking.modeoftypeid = 3;
    var inDate = new Date(formData.checkin);
    var OutDate = new Date(formData.checkout);

    var noofdays = (OutDate.getTime() - inDate.getTime()) / (1000 * 3600 * 24);
    console.log("nnnnn", noofdays);
    console.log("booking", this.booking);
    if (this.walkingRoomCheckFuture.valid) {
      console.log("123", this.booking);
      this.getroomlistservice.roomlogic(formData.adult, formData.checkin, formData.checkout).subscribe((result) => {
        console.log(result);
        this.roomData = result[0];
        this.getroomlistservice.setData(this.roomData)
        console.log("++++roomData:", this.roomData);
        console.log("0 value:", this.roomData);
      });
    }
    this.roomBookingSum = new BookingModel();
    this.roomBookingSum.checkin = formData.checkin,
      this.roomBookingSum.checkout = formData.checkout,
      this.roomBookingSum.noofdays = noofdays;
    this.roomBookingSum.adults = formData.adult;
    this.roomBookingSum.child = formData.children;
    this.roomBookingSum.childage = this.ageValue == undefined ? 0 : this.ageValue;
    this.roomBookingSum.roomtype = formData.roomtype;
    this.roomBookingSum.modeoftypeid = 3;


    console.log("___+++", this.roomBookingSum)
    this.bookingService.changeMessage(this.roomBookingSum);
    this.router.navigate(["roomlogic"])
  }


  showRoomType(){
    this.roomTypeService.getRoomType()
    // .subscribe((res)=>{
      .subscribe((result)=>{
      console.log("roomtype:",result);    
       this. visibleRoom=result;
       console.log("walkingfuture",this.visibleRoom);
    });
  

  }


  //hiding info box
  visible: boolean = false
  facilities: boolean = true
  samArray: any = []
  childAge: any = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]


  ValueEntered(value: any) {
    // console.log("djhckjkasj")
    this.samArray = []
    for (let i = 1; i <= value; i++) {
      this.samArray.push(i)
    }
    console.log("array", this.samArray)
  }
  //onclick toggling both
  clickon() {
    //not equal to condition
    this.visible = !this.visible
  }

  childAgeMap = new Map<string, string>;
  ageValue: any;
  onSelected(value: any, e: any) {
    this.childAgeMap.set(e, value);
    //   this.childMap.forEach((value: string, key: string) => {
    //     console.log("++++",key, value);})
    //   for ( let value of this.childMap.values()) {
    //     console.log("aa:",value);
    // }
    console.log("childage:", this.childAgeMap);
    // this.childMap.forEach((value: string, key: string) => {
    //       console.log("++++",key, value);
    //       this.selectedAge[key]=value;
    //     })
    const arr = [Array.from(this.childAgeMap).reduce((acc, curr) => ({
      ...acc,
      [curr[0]]: curr[1]
    }), Object.create(null))];

    console.log("rrr", arr[0]);
    this.ageValue = Object.values(arr[0]);
    console.log("age++", this.ageValue)
    // this.selectedAge.push(value)
    //  console.log("age:", this.selectedAge);
  }


}






