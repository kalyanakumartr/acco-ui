import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GetRoomList } from 'src/app/model/getroomlist.model';
import { GetroomlistService } from 'src/app/services/getroomlist.service';
import { NgbDate, NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { GetroomtypeService } from 'src/app/services/getroomtype.service';
import { BookingServiceService } from 'src/app/services/booking-service.service';
import { BookingModel } from 'src/app/model/booking.model';
// import { DateTime } from 'luxon';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { NativeDateAdapter } from '@angular/material/core';
import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
//  import * as bootstrap from 'bootstrap';
// declare var bootstrap:any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  @ViewChild('exampleModal')
  modalElement!: ElementRef;

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
  times: string[] = [];
  selectedTime: any;
  finalmonth: any;
  finalday: any;
  finalOutday: any;
  tokenvalue: any;
  visibleRoom: any;
  roomBooking: any;
  currentValue: any;
  minDate: any;
  maxDate: any;
  availableStatus!: string;
  maxAdultStatus!: string;
  totalDays:any;

  constructor(private fb: FormBuilder, private http: HttpClient,
    private router: Router, private getroomlistservice: GetroomlistService,
    private roomTypeService: GetroomtypeService,
    public bookingService: BookingServiceService,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private modalService: NgbModal
  ) { }



  ngOnInit(): void {
    const date1 = new Date();
    this.generateTimeIntervals();
    this.setCurrentTime();

    this.setCheckInOut(date1);
    console.log("datenow", this.selectedDate)
    this.tokenvalue = localStorage.getItem('token');

    this.homeForm = this.fb.group({
      checkIn: ['', Validators.required],
      checkInTime: ['', Validators.required],
      checkOut: ['', Validators.required],
      checkOutTime: ['', Validators.required],
      adult: ['1', [Validators.required, Validators.pattern("^[1-9][0-9]*$")]],
      child: ['0', [Validators.required, Validators.max(6)]],
      roomType: ['1', Validators.required],
    })
    this.showRoomType();
    console.log('Initial Room Type:', this.homeForm.get('roomType')?.value);
    console.log('Form values:', this.homeForm.value);
    //     this.currentValue = new BookingModel();
    //     this.currentValue = localStorage.getItem('currentValue');
    //     // const checkout = localStorage.getItem('checkout');
    //     // const checkintime = localStorage.getItem('checkintime');
    //     // const checkouttime = localStorage.getItem('checkouttime');
    //     // const adult = localStorage.getItem('adult');
    //     // const child = localStorage.getItem('child');
    //     // const roomtype = localStorage.getItem('roomtype');
    //      console.log("checkin",this.currentValue);
    //      const checkInCu = this.currentValue.checkIn;  // "2024-12-16"
    // const checkInTime = this.currentValue.checkInTime;  // "16:30"
    // const checkOut = this.currentValue.checkOut;  // "2024-12-17"
    // const checkOutTime = this.currentValue.checkOutTime;  // "16:30"
    // const adult = this.currentValue.adult;  // "1"
    // const child = this.currentValue.child;  // "0"
    // const roomType =this. currentValue.roomType;
    //     if (this.currentValue) {
    //       console.log("this.currentValue",checkInCu);
    //       this.Todaydate = checkInCu;
    //       this.outDate = this.currentValue.checkOut;
    //       this.selectedTime = this.currentValue.checkInTime;
    //       this.homeForm.patchValue({ adult: this.currentValue.adult, child: this.currentValue.child });
    //     }
    const storedValue = localStorage.getItem('currentValue');
    if (storedValue) {
      const formData = JSON.parse(storedValue);
      console.log("formData", formData);
      this.homeForm.patchValue(formData);
      this.Todaydate = formData.checkIn // Patch the form with the saved data
      this.outDate = formData.checkOut
    };

    localStorage.removeItem('currentValue');



  }

  setCheckInOut(date1: Date) {
    console.log('1111', date1)

    const currentyear = date1.getUTCFullYear();
    const currentmonth = date1.getUTCMonth() + 1;
    const currentday = date1.getUTCDate();
    const checkoutday = date1.getDate() + 1;
    const currentmin = date1.getMinutes();
    const currenthour = date1.getHours();
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

    this.Todaydate = currentyear + "-" + this.finalmonth + "-" + this.finalday
    this.outDate = currentyear + "-" + this.finalmonth + "-" + this.finalOutday
    this.minDate = currentyear + "-" + this.finalmonth + "-" + this.finalday
    this.maxDate = currentyear + "-" + this.finalmonth + "-" + this.finalOutday


  }

  getNextDate(date: string) {
    // Parse the date string to a Date object
    const currentDate = new Date(date);

    // Add one day (in milliseconds)
    currentDate.setDate(currentDate.getDate() + 1);

    // Format the next date in YYYY-MM-DD format
    this.outDate = currentDate.toISOString().split('T')[0];

  }

  ReadMore: boolean = true

  //hiding info box
  visible: boolean = false
  facilities: boolean = true
  samArray: any = []
  childAge: any = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]


  ValueEntered(value: any) {
    this.samArray = []
    for (let i = 1; i <= value; i++) {
      this.samArray.push(i)
    }
    console.log("array", this.samArray)
  }

  //onclick toggling both
  clickon() {
    this.visible = !this.visible
  }

  childAgeMap = new Map<string, string>;
  ageValue: any;

  onSelected(value: any, e: any) {
    this.childAgeMap.set(e, value);
    console.log("childage:", this.childAgeMap);
    const arr = [Array.from(this.childAgeMap).reduce((acc, curr) => ({
      ...acc,
      [curr[0]]: curr[1]
    }), Object.create(null))];

    console.log("rrr", arr[0]);
    this.ageValue = Object.values(arr[0]);
    console.log("age++", this.ageValue)

  }

  checkAvailability() {
    console.log("formdata", this.homeForm.value);
    console.log("form", this.homeForm.value);
    const formdata = this.homeForm.value;
    const checkin = formdata.checkIn.concat(' ',formdata.checkInTime)
    const checkout = formdata.checkOut.concat(' ',formdata.checkOutTime)
    console.log("checkin checkout", checkin,checkout);
    var inDate = new Date(checkin);
    var OutDate = new Date(checkout);
    var diff = OutDate.getTime() - inDate.getTime();
    var days = Math.floor(diff / (60 * 60 * 24 * 1000));
    var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
    console.log("diff", diff);
    console.log("days", days);
    console.log("hours", hours);
    console.log("checkincheckout", checkin, checkout);
    if (hours > 2) {
      this.totalDays = days + 1
    } else {
      this.totalDays = days;
    }
    console.log("toldays", this.totalDays)

      localStorage.setItem("checkin", checkin);
      localStorage.setItem("checkout", checkout);
      localStorage.setItem("adult", formdata.adult);
      localStorage.setItem("child", formdata.child);
      localStorage.setItem("roomtype", formdata.roomType);
      localStorage.setItem("totaldays", this.totalDays );
      localStorage.setItem("childage", this.ageValue);


      if (this.tokenvalue == null) {
        this.cdr.detectChanges();
        this.getroomlistservice.checkRoomAvailability(formdata.adult, formdata.roomType, checkin, checkout)
        .subscribe(result => {
          console.log("check", result);
          const checkdata = result[0][0];
          localStorage.setItem("availStatus", checkdata.available_status);

          this.availableStatus = checkdata.available_status === "Available"
            ? "Hello! We're happy to let you know that we are available."
            : "Sorry for the inconvenience, we're currently unavailable.";
          this.maxAdultStatus = formdata.adult >= "90"
            ? "Our property can only accommodate up to 64 persons." : "";
          console.log("check111", this.availableStatus);
          this.cdr.detectChanges();
          const modalElement = document.getElementById('exampleModal');
          if (modalElement) {
            const modal = new Modal(modalElement);
            modal.show();
          }


        });
    }
    else {
      this.getroomlistservice.checkRoomAvailability(formdata.adult, formdata.roomType, checkin, checkout)
        .subscribe(result => {
          console.log("check", result);
          const checkdata = result[0][0];
          this.availableStatus = checkdata.available_status === "Available"
            ? "Hello! We're happy to let you know that we are available."
            : "Sorry for the inconvenience, we're currently unavailable.";
          this.maxAdultStatus = formdata.adult >= "90"
            ? "Our property can only accommodate up to 64 persons." : "";

          if (checkdata.available_status === "Available") {
            this.getroomlistservice.roomlogic(formdata.adult, checkin, checkout, formdata.roomType).subscribe((result) => {
              console.log(result);
              this.roomData = result[0];
              this.getroomlistservice.setData(this.roomData)
              console.log("++++roomData:", this.roomData);
              this.roomBooking = new BookingModel();
              this.roomBooking.checkin = checkin,
                this.roomBooking.checkout = checkout,
                this.roomBooking.noofdays = this.totalDays;
              this.roomBooking.adults = formdata.adult;
              this.roomBooking.child = formdata.child;
              this.roomBooking.childage = this.ageValue == undefined ? 0 : this.ageValue;
              this.roomBooking.roomtypeid = formdata.roomType;
              this.roomBooking.modeoftypeid = 1;
              console.log("___+++", this.roomBooking)
              this.bookingService.changeMessage(this.roomBooking);
              this.router.navigate(["roomlogic",
              ]);
              const keys = ["checkin", "checkout", "adult", "child", "roomtype", "totaldays", "childage"];
              keys.forEach(key => localStorage.removeItem(key));

            });
          } else {
            const keys = ["checkin", "checkout", "adult", "child", "roomtype", "totaldays", "childage"];
            keys.forEach(key => localStorage.removeItem(key));
            this.cdr.detectChanges();
            const modalElement = document.getElementById('exampleModal');
            if (modalElement) {
              const modal = new Modal(modalElement);
              modal.show();
            }
  
          }
        })
    }
  }

  getCheckOut() {
    const checkinDate = this.homeForm.get('checkIn')?.value;
    console.log("checkoutdate:", checkinDate);
    this.getNextDate(checkinDate);
  }

  showRoomType() {
    this.roomTypeService.getRoomType()
      .subscribe((result) => {
        //  this.cdr.detectChanges() 
        console.log("roomtype:", result);
        this.visibleRoom = result;
        this.cdr.detectChanges();
        console.log(this.visibleRoom);
      });
    //  this.cdr.detectChanges()
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


  closeModal(): void {
    const modalElement = document.getElementById('exampleModal');
    if (modalElement) {
      const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
      modal.hide();
    }
  }
  navigateTo(route: string) {
    this.closeModal(); // Close the modal before navigation
    this.router.navigate([route]);
  } // Navigate to the respective route  }
}
