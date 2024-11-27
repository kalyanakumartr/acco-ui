import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GetRoomList } from 'src/app/model/getroomlist.model';
import { GetroomlistService } from 'src/app/services/getroomlist.service';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { GetroomtypeService } from 'src/app/services/getroomtype.service';
import { BookingServiceService } from 'src/app/services/booking-service.service';
import { BookingModel } from 'src/app/model/booking.model';
import { DateTime } from 'luxon';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { NativeDateAdapter } from '@angular/material/core';
import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  homeForm!: FormGroup;
  modalForm!: FormGroup;
  selectedValue: any = '';
  floorData: any;
  floorRoom: any;
  inputnumber = 0;
  adultNumber: any;
  roomData: any;
  roomValue: any;
  checkOutCompleteDate: any;
  checkInCompleteDate: any;
  currentDate: any = new Date();
  Todaydate = "2023-03-12"
  outDate = "2023-03-12"
  select = null;
  value!: Date;
  isDisabled: boolean = false;
  isDropdownOpen: boolean = false;
  selectedDate: Date = new Date();
  // selectedTime: Date | null = null;
  times: string[] = [];
  selectedTime: any;
  constructor(private fb: FormBuilder, private http: HttpClient,
    private router: Router, private getroomlistservice: GetroomlistService,
    private roomTypeService: GetroomtypeService,
    public bookingService: BookingServiceService

  ) { }

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
  tokenvalue: any;
  visibleRoom: any;
  roomBooking: any;
  ngOnInit(): void {

    this.generateTimeIntervals();
    this.setCurrentTime();

    this.showRoomType();
    console.log("datenow", this.selectedDate)
    this.tokenvalue = localStorage.getItem('token');
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

    this.Todaydate = this.currentyear + "-" + this.finalmonth + "-" + this.finalday
    //  + " " + this.currenthour + ":" + this.currentmin;
    this.outDate = this.currentyear + "-" + this.finalmonth + "-" + this.finalOutday
    // + " " + this.currenthour + ":" + this.currentmin;
    // this.selectedTime= this.currenthour + ":" + this.currentmin;

    this.homeForm = this.fb.group({
      checkIn: ['', Validators.required],
      checkInTime: ['', Validators.required],
      checkOut: ['', Validators.required],
      checkOutTime: ['', Validators.required],
      adult: ['1', [Validators.required, Validators.pattern("^[1-9][0-9]*$")]],
      child: ['0', [Validators.required, Validators.max(6)]],
      roomType: ['1', Validators.required],
    })



    // for(let i=1;i<=9;i++){
    //   this.childAge.push(i);
    // }
    // console.log("age:",this.childAge)
    //   this.modalForm = this.fb.group({
    // user: ['',], });
    // this.getFloor();
    // this.getroom();


  }
  // modalProcess(){
  //   this.selectedValue = this.modalForm.controls['user'].value;
  //   console.log(this.selectedValue);    
  //   if(this.selectedValue == 'NewUser'){
  //     console.log(this.selectedValue);          
  //            this.router.navigate(["signup"]);             
  //   }else if(this.selectedValue=='ExistingUser'){
  //     console.log(this.selectedValue);     
  //     this.router.navigate(["login"]);

  //   }
  //   else{
  //     Swal.fire("Please select value");
  //   }
  // }


  ReadMore: boolean = true

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


  // FirstFloor: boolean = true;
  // FirstFloor1: boolean = true;
  // FirstFloor2: boolean = true;
  // ontouch() {
  //   this.facilities = !this.facilities
  // }

  // toggleFirstFloor()
  // {
  //   this.FirstFloor = !this.FirstFloor;
  // }

  // toggleFirstFloor1()
  // {
  //   this.FirstFloor1 = !this.FirstFloor1;
  // }


  // toggleFirstFloor2()
  // {
  //   this.FirstFloor2 = !this.FirstFloor2;
  // }

  // plus() {
  //   if (this.inputnumber < 6) {
  //     this.inputnumber = this.inputnumber + 1;
  //   }
  // }
  // minus() {
  //   if (this.inputnumber != 0) {
  //     this.inputnumber = this.inputnumber - 1;
  //   }

  // }
  // foodnumber = 0;
  // plus3() {
  //   if (this.foodnumber < 12) {
  //     this.foodnumber = this.foodnumber + 1;
  //   }
  // }
  // minus3() {
  //   if (this.foodnumber != 0) {
  //     this.foodnumber = this.foodnumber - 1;
  //   }
  // }


  checkAvailability() {
    console.log("formdata",this.homeForm.value);
    if (this.tokenvalue == null) {

      Swal.fire({
        text:
          " Please LOGIN if you are Existing user or SIGNUP for Newuser",
        // "<h5 style='color:red'>"++"</h5>"
        confirmButtonColor: '#964B00',
        background: '#efc96a',


      })
    } else {
      const formData = this.homeForm.value;
      console.log("chlid:", formData.child, formData.roomType, formData.checkIn, formData.checkOut)
      var checkingIn=`${formData.checkIn} ${formData.checkInTime}`;
      var checkingOut=`${formData.checkOut} ${formData.checkOutTime}`;

      var inDate = new Date(checkingIn);
      var OutDate = new Date(checkingOut);

      // var noofdays = (OutDate.getTime() - inDate.getTime()) / (1000 * 3600 * 24);

      // var noofdays = (OutDate.getTime() - inDate.getTime()) / (1000 * 3600 * 24);

      // console.log("nnnnn", noofdays);
      // console.log("nnnnn", formData.checkIn);
      var diff = OutDate.getTime() - inDate.getTime();
      var days = Math.floor(diff / (60 * 60 * 24 * 1000));
      var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
      console.log("diff", diff);
      console.log("days", days);
      console.log("hours", hours);
      console.log("checkincheckout",checkingIn,checkingOut);
      if (hours > 2) {
        var totalDays = days + 1
      } else {
        var totalDays = days;
      }
      console.log("toldays", totalDays)
      if (days <= 0) {
        Swal.fire({
          text:
            " Please verify your checkin and checkout dates",
          // "<h5 style='color:red'>"++"</h5>"
          confirmButtonColor: '#964B00',
          background: '#efc96a',


        })
      } else {
        // this.getroomlistservice.roomlist(formData.adult, formData.checkIn, formData.checkIn, formData.roomType).subscribe((res) => {
        this.getroomlistservice.roomlogic(formData.adult, checkingIn, checkingOut, formData.roomType).subscribe((result) => {
          console.log(result);
          this.roomData = result[0];
          this.getroomlistservice.setData(this.roomData)
          console.log("++++roomData:", this.roomData);
          console.log("0 value:", this.roomData);
          this.roomValue;
          if (this.roomData == 0) {
            Swal.fire({
              confirmButtonColor: '#964B00',
              background: '#efc96a',
              text: "We are Sorry! currently all rooms are occupied ",
            });
          } else {

            this.roomBooking = new BookingModel();
            this.roomBooking.checkin = checkingIn,
              this.roomBooking.checkout = checkingOut,
              this.roomBooking.noofdays = totalDays;
            this.roomBooking.adults = formData.adult;
            this.roomBooking.child = formData.child;
            this.roomBooking.childage = this.ageValue == undefined ? 0 : this.ageValue;
            this.roomBooking.roomtypeid = formData.roomType;
            this.roomBooking.modeoftypeid = 1;


            console.log("___+++", this.roomBooking)
            this.bookingService.changeMessage(this.roomBooking);
            this.router.navigate(["roomlogic",
              // {
              //   "days": noofdays,
              //   "adult": formData.adult,
              //   "cIn": formData.checkIn,
              //   "cOut": formData.checkOut,
              //   "child": formData.child,
              //   "roomType": formData.roomType,
              //   "childAge": this.ageValue
              // }
            ]);

          }
        });

      }
    }
  }

  showRoomType() {
    this.roomTypeService.getRoomType()
      // .subscribe((res)=>{
      .subscribe((result) => {
        console.log("roomtype:", result);
        this.visibleRoom = result;
        console.log(this.visibleRoom);
      });

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

  toggleTimeDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
