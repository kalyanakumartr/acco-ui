import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Modal from 'bootstrap/js/dist/modal';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { BookingModel } from 'src/app/model/booking.model';
import { MyBooking } from 'src/app/model/mybooking.model';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { BookingServiceService } from 'src/app/services/booking-service.service';
import { GetUserServiceService } from 'src/app/services/get-user-service.service';
import { RoleService } from 'src/app/services/role.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mybookings',
  templateUrl: './mybookings.component.html',
  styleUrls: ['./mybookings.component.scss']
})
export class MybookingsComponent implements OnInit {

  @ViewChild('exampleModal')
  modalElement!: ElementRef;

  // private apiData1 = new BehaviorSubject<any>(null);
  // public apiData1$ = this.apiData1.asObservable();

  userid: any;
  bookingid: any
  loginData: any;
  bookingData: any;
  roomBooking: any;
  cancelResult: any;
  cancelform= { bookingid: '', checkin: '', checkout: ''};
  formData = { reason: ''};
  formattedcheckin: any;
  formattedcheckout: any;
  booking: MyBooking[] = [];
  public databookingData = new MatTableDataSource<MyBooking>();
  dataObs$!: Observable<any>;
  isDisabled: boolean = false;
  cancelpolicydata: any;
  selectedBooking: any = null;
  isModalOpen = false;


  constructor(private roleService: RoleService,
    public authService: AuthServiceService,
    private getuserservice: GetUserServiceService,
    private bookingService: BookingServiceService,
    private router: Router,
    private _changeDetectorRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private datePipe: DatePipe

  ) {
    authService.apiData$.subscribe(data => this.loginData = data)
  }

  @ViewChild('paginator')
  paginator!: MatPaginator;
  PageSizes = [5, 10, 15];

  ngAfterViewInit() {
    this.databookingData.paginator = this.paginator;
  }

  ngOnInit(): void {
    this._changeDetectorRef.detectChanges();
    this.userid = this.loginData.userid;
    console.log("id:", this.userid);

    // this.bookingData="";
    this.getMyBooking(this.userid);
    this.setPagination(this.bookingData);
    // if (this.endDate < this.today ) {
    //   this.isDisabled = false;
    // }
    // this.cancelform = this.fb.group({
    //   bookingid: ["", Validators.required],
    //   checkin: ["", Validators.required],
    //   checkout: ["", Validators.required],
    //   reason: ['', Validators.required],
    // })


  }
  getMyBooking(userid: any) {
    // this.bookingData.clear();
    this.getuserservice.myBooking(userid)
      .subscribe((result) => {
        console.log(result);
        this.databookingData.data = result;
        console.log("))))00000", this.databookingData.data)

        this.bookingData = result;
        // this.getuserservice.setData(this.bookingData)
        console.log("(((((", this.bookingData);
      });

  }



  cancelBooking(id: any, checkin: any, checkout: any) {

    this.cancellationpolicy();

    this.bookingid = id;
    this.formattedcheckin = this.datePipe.transform(checkin, 'dd-MM-yyyy');
    this.formattedcheckout = this.datePipe.transform(checkout, 'dd-MM-yyyy');
    this.cancelform={bookingid: id, checkin: checkin, checkout: checkout,}


  }

  cancelbooking() {
    this.isModalOpen = true;
    console.log("cancel",this.formData.reason);
    const book = new BookingModel();

    book.bookingid = this.bookingid;
    book.userid = this.userid;
    book.commands = this.formData.reason;
    book.statusid = "10";
    console.log("book", book)

    this.bookingService.bookingCancel(book).subscribe((result: any) => {
      console.log("res", result);
      // this.cancelResult=result;
      Swal.fire({
        text: result.message,
        confirmButtonColor: '#964B00',
        background: '#efc96a',
      });
      this.closeCancelModal();
      // this.router.navigate(["cancelbooking",

      // ]);
    })
  }

  closeCancelModal(): void {
    this.isModalOpen = false;
    this.formData = { reason: '' }; // Reset form
  }

  cancellationpolicy() {
    this.bookingService.getcancelpolicy().subscribe(result => {
      console.log("res", result);
      this.cancelpolicydata = result;
    })
  }


  //   console.log("cancel");
  //   const book = new BookingModel();
  //   book.bookingid = id;
  //   book.userid = this.userid
  //   this.bookingService.bookingCancel(book).subscribe(result => {
  //     console.log("res", result);
  //     // this.cancelResult=result;
  //     Swal.fire({
  //       text: result.message,
  //       confirmButtonColor: '#964B00',
  //       background: '#efc96a',
  //     });
  //   })
  //   this.getMyBooking(this.userid);
  // }

  // setData(bookingData: any) {
  //   this.apiData.next(bookingData)
  // }

  bookingview(details: any) {
    console.log("det", details)
    this.roomBooking = new BookingModel();
    // console.log("length",this.bookingData.length)
    // for (var i=0;i<this.bookingData.length;i++) {
    //   console.log("chck",this.bookingData[i].checkin)
    this.roomBooking.checkin = details.checkin
    this.roomBooking.checkout = details.checkout
    // this.roomBooking.roomtype = details.roomtype
    this.roomBooking.totalprice = details.totalprice
    this.roomBooking.bookingid = details.bookingid
    this.roomBooking.adults = details.adults
    this.roomBooking.child = details.child
    this.roomBooking.roomtypeid = details.roomtypeid


    //  }

    console.log("0000000", this.roomBooking)

    this.bookingService.changeMessage(this.roomBooking);
    this.router.navigate(["bookingdetails",

    ]);

  }



  setPagination(data: any) {
    console.log("++++1111", MyBooking)
    this.databookingData = new MatTableDataSource<any>(data);
    this._changeDetectorRef.detectChanges();
    this.databookingData.paginator = this.paginator;
    this.dataObs$ = this.databookingData.connect();
  }



  setBookingData(booking: any) {
    this.selectedBooking = booking;
  }

}




