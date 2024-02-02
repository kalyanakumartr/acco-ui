import { Component, OnInit } from '@angular/core';
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
  selector: 'app-walkingcurrent',
  templateUrl: './walkingcurrent.component.html',
  styleUrls: ['./walkingcurrent.component.scss']
})
export class WalkingcurrentComponent implements OnInit {
  walkingCurrentForm!: FormGroup;
  user = new UserModel();
  submitted = false;
  visibleRoom: any;
  formData: any;
  walkinguser = new UserModel();
  booking = new BookingModel();
  roomData:any;
  roomBookingSummary:any

  Todaydate = "2023-03-12"
  outDate = "2023-03-12"
  userData: any;
  walkingRoomCheck!: FormGroup;

  constructor(private fb: FormBuilder,
    private roomTypeService: GetroomtypeService,
    private registerService: RegisterServiceService,
    private emailservice: EmailcheckService,
    private router:Router,
    private getroomlistservice: GetroomlistService,
    public bookingService:BookingServiceService

  ) {getroomlistservice.apiRoom$.subscribe(data => this.roomData = data) }

  date1 = new Date();
  currentyear = this.date1.getUTCFullYear();
  currentmonth = this.date1.getUTCMonth() + 1;
  currentday = this.date1.getUTCDate();
  checkoutday = this.date1.getDate() + 1;
  currentmin = this.date1.getMinutes();
  currenthour = this.date1.getHours();

  finalmonth: any;
  finalday: any;
  finalOutday: any;
  ngOnInit(): void {

    this.showRoomType();
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
    this.outDate = this.currentyear + "-" + this.finalmonth + "-" + this.finalOutday + " " + this.currenthour + ":" + this.currentmin;


    this.walkingCurrentForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern("^[a-zA-Z]{3,15}$")]],
      lastname: ['', Validators.required,],
      email: ['', [Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      phonenumber: ['', [Validators.required, Validators.pattern("^[0-9]{0,10}$")]],
      address1: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9,./ ]*$")]],
      address2: ['', Validators.required,],
      city: ['', Validators.required],
      state: ['', Validators.required,],
      country: ['', Validators.required,],
      pincode: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      // from: ['', Validators.required,],
      // to: ['', Validators.required,],
      // adult: ['1', [Validators.required, Validators.pattern("^[1-9][0-9]*$")]],
      // children: ['0', [Validators.required, Validators.max(6)]],
      // roomtype: ['1', Validators.required,],
      // roleid: 3
    });

    this.walkingRoomCheck =this.fb.group({
      checkin: ['', Validators.required,],
      checkout: ['', Validators.required,],
      adult: ['1', [Validators.required, Validators.pattern("^[1-9][0-9]*$")]],
      children: ['0', [Validators.required, Validators.max(6)]],
      roomtype: ['1', Validators.required,],
      roleid: 3

    })

  }
  


  walkingCurrentFormProcess() {

    const formData = this.walkingCurrentForm.value;
    this.walkinguser.firstname = formData.firstname;
    this.walkinguser.lastname = formData.lastname;
    this.walkinguser.email = formData.email;
    this.walkinguser.phonenumber = formData.phonenumber;
    this.walkinguser.address1 = formData.address1;
    this.walkinguser.address2 = formData.address2;
    this.walkinguser.city = formData.city;
    this.walkinguser.state = formData.state;
    this.walkinguser.country = formData.country;
    this.walkinguser.pincode = formData.pincode;
    this.walkinguser.username = "";
    this.walkinguser.password = "";
    this.walkinguser.cpassword = "";
    this.walkinguser.roleid=3;
 
     if (this.walkingCurrentForm.valid) {
      console.log("123",this.walkinguser);
         this.registerService.register(this.walkinguser).
        subscribe(res => {
          console.log("res",res); 
          let result=res;        
            this.walkingCurrentForm.reset();
            Swal.fire({
              text:res.message,
              confirmButtonColor: '#964B00',
              background:'#efc96a',
            }); 
        })
     }
  }


  walkingRoomCheckProcess(){
    const formData = this.walkingRoomCheck.value;
    this.booking.checkin = formData.checkin;
    this.booking.checkout = formData.checkout;
    this.booking.adults = formData.adult;
    this.booking.child = formData.children;
    this.booking.roomtype = formData.roomtype;
    var inDate = new Date(formData.checkin);
    var OutDate = new Date(formData.checkout);

    var noofdays = (OutDate.getTime() - inDate.getTime()) / (1000 * 3600 * 24);
    console.log("nnnnn", noofdays);
    console.log("booking",this.booking);
    if (this.walkingRoomCheck.valid) {
      console.log("123",this.booking);
      this.getroomlistservice.roomlogic(formData.adult,formData.checkin,formData.checkout).subscribe((result)=>{
        console.log(result);
        this.roomData = result[0];
        this.getroomlistservice.setData(this.roomData)
         console.log("++++roomData:", this.roomData);
        console.log("0 value:", this.roomData);
        this.router.navigate(["roomlogic" ]);
        });
    }
    this. roomBookingSummary= new BookingModel();
    this. roomBookingSummary.checkin=formData.checkin,
    this.roomBookingSummary.checkout=formData.checkout,
    this.roomBookingSummary.noofdays=noofdays;
    this.roomBookingSummary.adults=formData.adult;
    this.roomBookingSummary.child=formData.children;
    this.roomBookingSummary.childage=this.ageValue==undefined?0:this.ageValue;
    this.roomBookingSummary.roomtype=formData.roomtype;
    
    console.log("___+++",this.roomBookingSummary)
    this.bookingService.changeMessage(this.roomBookingSummary);
      this.router.navigate(["roomlogic"])
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

  checkemail(value: any) {
    

    console.log("email", value)
    this.walkingCurrentForm.reset();
    Swal.fire(" phonenumber is  not register");
    this.emailservice.emailverify(value).subscribe((result) => {
      this.userData = result[0];
      console.log("userdata",this.userData)
      // Swal.fire(" phonenumber is  register");
      this.walkingCurrentForm.controls['email'].setValue(this.userData.email);
      this.walkingCurrentForm.controls['firstname'].setValue(this.userData.firstname);
      this.walkingCurrentForm.controls['lastname'].setValue(this.userData.lastname);
      this.walkingCurrentForm.controls['address1'].setValue(this.userData.address1);
      this.walkingCurrentForm.controls['address2'].setValue(this.userData.address2);
      this.walkingCurrentForm.controls['city'].setValue(this.userData.city);
      this.walkingCurrentForm.controls['state'].setValue(this.userData.state);
      this.walkingCurrentForm.controls['country'].setValue(this.userData.country);
      this.walkingCurrentForm.controls['pincode'].setValue(this.userData.pincode);
      this.walkingCurrentForm.controls['phonenumber'].setValue(this.userData.phonenumber);
      // localStorage.clear();
      localStorage.removeItem('currentuserid');
      const currentuser = new UserModel() ;
      currentuser.userid=this.userData.userid;
      currentuser.firstname=this.userData.firstname;
const jsondata=JSON.stringify(currentuser);
      localStorage.setItem('currentuserid',jsondata);
      // localStorage.setItem('currentusername',this.userData.firstname);
      Swal.fire(" phonenumber is  register");
      


    })

  }



  showRoomType() {
    this.roomTypeService.getRoomType()
      // .subscribe((res)=>{
      .subscribe((result) => {
        console.log("roomtype:", result);
        this.visibleRoom = result;
        console.log("walkingcurrent", this.visibleRoom);
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






