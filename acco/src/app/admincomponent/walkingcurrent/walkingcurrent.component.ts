import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, OnInit, VERSION, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { City, Country, State } from 'country-state-city';
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
  roomData: any;
  roomBookingSum: any
  
  Todaydate = "12-09-2024"
  outDate = "12-09-2024"
  userData: any;
  walkingRoomCheck!: FormGroup;
  times: string[] = [];
  selectedTime: any;
  minDate: any;
  maxDate: any;



  constructor(private fb: FormBuilder,
    private roomTypeService: GetroomtypeService,
    private registerService: RegisterServiceService,
    private emailservice: EmailcheckService,
    private router: Router,
    private getroomlistservice: GetroomlistService,
    public bookingService: BookingServiceService,
     private cdr: ChangeDetectorRef,
     private datePipe: DatePipe

  ) { getroomlistservice.apiRoom$.subscribe(data => this.roomData = data) }

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

  @ViewChild('country') country!: ElementRef
  @ViewChild('city') city!: ElementRef
  @ViewChild('state') state!: ElementRef
  name = 'Angular ' + VERSION.major;
  countries = Country.getAllCountries();
  states: any = null;
  cities: any = null;

  selectedCountry: any;
  selectedState: any;
  selectedCity: any;

  ngOnInit(): void {
    const date1 = new Date();
    this.setCheckInOut(date1);
    this.generateTimeIntervals();
    this.setCurrentTime();
    this.getNextDate(date1);



    this.showRoomType();

    this.walkingCurrentForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern("^[a-zA-Z]{3,15}$")]],
      lastname: ['', Validators.required,],
      email: ['', [Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      phonenumber: ['', [Validators.required, Validators.pattern("^[0-9]{0,10}$")]],
      address1: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9,./ ]*$")]],
      address2: ['', Validators.required,],
      city: ['null', Validators.required],
      state: ['null', Validators.required,],
      country: ['null', Validators.required,],
      pincode: ['', [Validators.required, Validators.pattern("^[0-9]{6}$")]],
      // from: ['', Validators.required,],
      // to: ['', Validators.required,],
      // adult: ['1', [Validators.required, Validators.pattern("^[1-9][0-9]*$")]],
      // children: ['0', [Validators.required, Validators.max(6)]],
      // roomtype: ['1', Validators.required,],
      // roleid: 3
    });

    this.walkingRoomCheck = this.fb.group({
      checkIn: ['', Validators.required],
      checkInTime: ['', Validators.required],
      checkOut: ['', Validators.required],
      checkOutTime: ['', Validators.required],
      adult: ['1', [Validators.required, Validators.pattern("^[1-9][0-9]*$")]],
      children: ['0', [Validators.required, Validators.max(6)]],
      roomtype: ['1', Validators.required,],
      roleid: 3

    })

  }


  onCountryChange($event: any): void {
    this.states = State.getStatesOfCountry(JSON.parse(this.country.nativeElement.value).isoCode);
    this.selectedCountry = JSON.parse(this.country.nativeElement.value);
    this.cities = this.selectedState = this.selectedCity = null;
    console.log("country", this.selectedCountry)
  }

  onStateChange($event: any): void {
    this.cities = City.getCitiesOfState(JSON.parse(this.country.nativeElement.value).isoCode, JSON.parse(this.state.nativeElement.value).isoCode)
    this.selectedState = JSON.parse(this.state.nativeElement.value);
    this.selectedCity = null;
    console.log("state", this.selectedState)


  }

  onCityChange($event: any): void {
    this.selectedCity = JSON.parse(this.city.nativeElement.value)
    console.log("city", this.selectedCity)

  }


  walkingCurrentFormProcess() {

    const formData = this.walkingCurrentForm.value;
    this.walkinguser.firstname = formData.firstname;
    this.walkinguser.lastname = formData.lastname;
    this.walkinguser.email = formData.email;
    this.walkinguser.phonenumber = formData.phonenumber;
    this.walkinguser.address1 = formData.address1;
    this.walkinguser.address2 = formData.address2;
    this.walkinguser.city = this.selectedCity.name;
    this.walkinguser.state = this.selectedState.name;
    this.walkinguser.country = this.selectedCountry.name;
    this.walkinguser.pincode = formData.pincode;
    this.walkinguser.username = "";
    this.walkinguser.password = "";
    this.walkinguser.cpassword = "";
    this.walkinguser.roleid = 3;
    this.walkinguser.modeoftypeid = 2

    if (this.walkingCurrentForm.valid) {
      console.log("123", this.walkinguser);
      this.registerService.register(this.walkinguser).
        subscribe(res => {
          console.log("res", res);
          let result = res;
          this.walkingCurrentForm.reset();
          Swal.fire({
            text: res.message,
            confirmButtonColor: '#964B00',
            background: '#efc96a',
          });
        })
    }
  }


  walkingRoomCheckProcess() {
    
    const formData = this.walkingRoomCheck.value;
    const checkin = formData.checkIn.concat(' ',formData.checkInTime)
    const checkout = formData.checkOut.concat(' ',formData.checkOutTime)
    console.log("checkin checkout", checkin,checkout);
    this.booking.checkin = checkin;
    this.booking.checkout = checkout;
    this.booking.adults = formData.adult;
    this.booking.child = formData.children;
    this.booking.roomtypeid = formData.roomtype;
    this.booking.modeoftypeid = 2
    var inDate = new Date(checkin);
    var OutDate = new Date(checkout);
    var diff=OutDate.getTime() - inDate.getTime();
    var days = Math.floor(diff / (60 * 60 * 24 * 1000));
    var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
    console.log("diff", diff);
    console.log("days", days);
    console.log("hours", hours);

    if(hours>2){
      var totalDays=days+1
    }else{
      var totalDays=days;
    }
    console.log("booking", this.booking);
    if(days<=0){
      Swal.fire({
        text:
          " Please verify your checkin and checkout dates",
        // "<h5 style='color:red'>"++"</h5>"
        confirmButtonColor: '#964B00',
        background: '#efc96a',


      })
    } else if (this.walkingRoomCheck.valid) {
      console.log("123", this.booking);
      this.getroomlistservice.roomlogic(formData.adult,checkin,checkout,formData.roomtype).subscribe((result) => {
        console.log(result);
        this.roomData = result[0];
        this.getroomlistservice.setData(this.roomData)
        console.log("++++roomData:", this.roomData);
        console.log("0 value:", this.roomData);
      });
    
    this.roomBookingSum = new BookingModel();
    this.roomBookingSum.checkin = formData.checkin,
    this.roomBookingSum.checkout = formData.checkout,
    this.roomBookingSum.noofdays = totalDays;
    this.roomBookingSum.adults = formData.adult;
    this.roomBookingSum.child = formData.children;
    this.roomBookingSum.childage = this.ageValue == undefined ? 0 : this.ageValue;
    this.roomBookingSum.roomtypeid = formData.roomtype;
    this.roomBookingSum.modeoftypeid = 2;


    console.log("___+++", this.roomBookingSum)
    this.bookingService.changeMessage(this.roomBookingSum);
    this.router.navigate(["roomlogic"])
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

  checkPhoneNumber(value: any) {

    console.log("phone number", value)
     this.walkingCurrentForm.reset();
    // Swal.fire({
    //         text: "Phonenumber not Registered",
    //         confirmButtonColor: '#964B00',
    //         background: '#efc96a',
    //       });
    this.emailservice.emailverify(value).subscribe((result) => {
      const response=result;
      console.log("response", response)
      if(response?.result){
      this.userData = result.result[0];
      console.log("userdata", this.userData)
      Swal.fire({
        text: response?.message,
        confirmButtonColor: '#964B00',
        background: '#efc96a',
      });
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
    }else{
      Swal.fire({
        text: response?.message || 'Something went wrong!',
        // icon: 'error',
        confirmButtonColor: '#964B00',
        background: '#efc96a',
      });
    }


    })

  }



  showRoomType() {
    this.roomTypeService.getRoomType()
      // .subscribe((res)=>{
      .subscribe((result) => {
        console.log("roomtype:", result);
        this.visibleRoom = result;
        this.cdr.detectChanges();
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

  getCheckOut() {
    const checkinDate = this.walkingRoomCheck.get('checkIn')?.value;
    console.log("checkoutdate:", checkinDate);
    this.getNextDate(checkinDate);
  }

  getNextDate(date: any) {
    // Parse the date string to a Date object
    const currentDate = new Date(date);

    // Add one day (in milliseconds)
    currentDate.setDate(currentDate.getDate() + 1);

    // Format the next date in YYYY-MM-DD format
    this.outDate = currentDate.toISOString().split('T')[0];
    console.log('in getNextDate ' ,this.outDate)

  }


  generateTimeIntervals() {
    const intervals: string[] = [];
    const start = 0; // Start at 12:00 AM
    const end = 24 * 60; // End at 11:59 PM
    const step = 30; // Interval in minutes

    for (let i = start; i < end; i += step) {
      const hours = Math.floor(i / 60);
      const minutes = i % 60;

      const formattedHours = hours.toString().padStart(2, '0');
      const formattedMinutes = minutes.toString().padStart(2, '0');

      intervals.push(`${formattedHours}:${formattedMinutes}`);
    }

    this.times = intervals; // Assign to times array
  }
  setCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    const roundedMinutes = Math.ceil(minutes / 30) * 30; // Round up to the nearest 15 minutes

    const adjustedHours = roundedMinutes === 60 ? (hours + 1) % 24 : hours;
    const formattedMinutes = roundedMinutes === 60 ? '00' : roundedMinutes.toString().padStart(2, '0');
    // Format time in 24-hour format
    const formattedTime = `${adjustedHours.toString().padStart(2, '0')}:${formattedMinutes}`;
    this.selectedTime = formattedTime;
    console.log('time now', this.selectedTime)
  }
  setCheckInOut(date1: Date) {
    console.log('1111', date1)

    const currentyear = date1.getUTCFullYear();
    const currentmonth = date1.getUTCMonth() + 1;
    const currentday = date1.getUTCDate();
    const checkoutday = date1.getDate() + 1;
    console.log('1111232', currentyear, currentmonth, currentday, checkoutday);

    if (currentmonth < 10) {
      this.finalmonth = "0" + currentmonth;
    } else {
      this.finalmonth = currentmonth;
    }
    if (currentday < 10) {
      this.finalday = "0" + currentday;
    } else {
      this.finalday = currentday;
    }
    if (checkoutday < 10) {
      this.finalOutday = "0" + checkoutday;
    } else {
      this.finalOutday = checkoutday;
    }

    this.Todaydate =  this.finalday + "-" + this.finalmonth + "-" + currentyear
    this.outDate = this.finalOutday + "-" + this.finalmonth + "-" + currentyear
    this.minDate = this.finalday + "-" + this.finalmonth + "-" + currentyear


    // this.Todaydate = currentyear + "-" + this.finalmonth + "-" + this.finalday
    //  this.outDate = currentyear + "-" + this.finalmonth + "-" + this.finalOutday
    // this.minDate = currentyear + "-" + this.finalmonth + "-" + this.finalday
    // this.maxDate = currentyear + "-" + this.finalmonth + "-" + this.finalOutday


  }




}






