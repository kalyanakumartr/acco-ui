import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BookingModel } from 'src/app/model/booking.model';
import { GetguestdetailService } from 'src/app/services/getguestdetail.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-frontdesk',
  templateUrl: './frontdesk.component.html',
  styleUrls: ['./frontdesk.component.scss']
})
export class FrontdeskComponent implements OnInit {
  TodayDate = "2022-12-11";
  date1 = new Date();
  currentDate: any = new Date();
  currentyear = this.date1.getUTCFullYear();
  currentmonth = this.date1.getUTCMonth() + 1;
  currentday = this.date1.getUTCDate();
  finalmonth: any;
  finalday: any;
  guestData: any;

  bookingid: any;
  checkin: any;
  checkout: any;
  public databookingData = new MatTableDataSource<any>();
  dataObs$!: Observable<any>;
  constructor(private getguestdetail: GetguestdetailService, private router: Router,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {
    // getguestdetail.getGuest$.subscribe(res => this.guestData = res);
    // console.log(this.guestData)

  }

  @ViewChild('paginator')
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.databookingData.paginator = this.paginator;

    // this.bookingData.paginator=this.paginator;

  }

  ngOnInit(): void {

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
    this.TodayDate = this.currentyear + "-" + this.finalmonth + "-" + this.finalday;
    this.calggapi(this.TodayDate);
    this.setPagination(this.guestData);
  }



  calggapi(seldate: any) {
    console.log("daaaaaa", seldate);
    this.getguestdetail.getGuestData(seldate).subscribe(res => {
      console.table("0000", res[0]);
      this.guestData = res[0]
      this.databookingData.data = res[0];
      console.log("guestdata", this.guestData);
    });
    //  this.bookingid=this.guestData.bookingid;
    //  this.checkin=this.guestData.checkin;
    //  this.checkout=this.guestData.checkout;
    // this.getroomslist(78,2024-1-19,2024-1-20);
  }






  setPagination(data: any) {
    this.databookingData = new MatTableDataSource<any>(data);
    this._changeDetectorRef.detectChanges();
    this.databookingData.paginator = this.paginator;
    this.dataObs$ = this.databookingData.connect();
  }



  updateproof(id: any) {
    this.router.navigate(["updateproof",
      {
        "bookingid": id,

      }])

  }

  getroomslist(bookingid: any, checkin: any, checkout: any, bhk1: any, bhk2: any, bhk3: any, rooms: any, roomnos: any, roomtypeid: any) {
    this.router.navigate(["selectrooms",
      {
        "bookingid": bookingid,
        "checkin": checkin,
        "checkout": checkout,
        "bhk1": bhk1,
        "bhk2": bhk2,
        "bhk3": bhk3,
        "rooms": rooms,
        "roomnos": roomnos,
        "roomtype": roomtypeid


      }])
    // let tmp : any =[];
    // console.log("daaaaaa",bookingid,checkin,checkout);
    // this.getguestdetail.getroomsList(bookingid,checkin,checkout).subscribe(res=>{
    //   console.table("0000",res[0]);
    //   this.roomsListData=res[0];
    //   console.log("roomslistdata",this.roomsListData);
    //   for(let i=0; i < this.roomsListData.length; i++) {
    //     tmp.push({ item_id:this. roomsListData.roomid , item_text: this. roomsListData[i].roomnos[i] });

    //   }
    //   return this.dropdownList = tmp;     

    // });
    // console.log("dropdownList",this.dropdownList);

  }

  // bookingRoom(){
  //   const book = new BookingModel() ;
  //   book.bookingid=this.bookingid;
  //   book.checkin=this.checkin;
  //   book.checkout=this.checkout;
  // console.log("booook",book);
  //     // const basic= this.Basicform.value
  //   this.getguestdetail.bookRoomList(book).    
  //   subscribe( result=>{
  //           console.log(result);              
  //       Swal.fire({
  //         text:
  //         " Booked Successfully",          
  //         confirmButtonColor: '#964B00',
  //         background:'#efc96a',
  //     });
  //       this.router.navigate(["home"]);
  //   })
  // }



  checkOutTime(id: any, roomtypeid: any) {
    this.router.navigate(["checkouttime",
      {
        "bookingid": id,
        "roomtypeid": roomtypeid
      }])
  }

  selectedBooking: any = null;

  setBookingData(booking: any) {
    this.selectedBooking = booking;
  }



  //  // Print function
  //  printBookingDetails(): void {
  //   if (this.selectedBooking) {
  //     const modalContent = document.querySelector("#bookingModal .modal-body")?.innerHTML;

  //     const printContent = `
  //       <div style="text-align: center; padding: 20px;">
  //         <h3>Booking ID: ${this.selectedBooking.bookingid}</h3>
  //         ${modalContent}
  //       </div>
  //     `;

  //     if (printContent) {
  //       const printWindow = window.open('', '', 'height=600,width=800');

  //       printWindow?.document.write('<html><head><title>Booking Details</title>');
  //       printWindow?.document.write('<style>');
  //       printWindow?.document.write(`
  //         body {
  //           font-family: Arial, sans-serif;
  //           padding: 20px;
  //           margin: 0;
  //         }
  //         h3 {
  //           color: brown;
  //         }
  //         table {
  //           width: 100%;
  //           border-collapse: collapse;
  //           margin: 20px 0;
  //         }
  //         th, td {
  //           text-align: left;
  //           padding: 10px;
  //           border: 1px solid #ddd;
  //         }
  //         th {
  //           background-color: #f2f2f2;
  //           font-weight: bold;
  //         }
  //         td {
  //           background-color: #f9f9f9;
  //         }
  //       `);
  //       printWindow?.document.write('</style></head><body>');

  //       printWindow?.document.write(printContent);

  //       printWindow?.document.write('</body></html>');
  //       printWindow?.document.close();
  //       printWindow?.print();
  //     }
  //   } else {
  //     console.log('No booking selected for printing');
  //   }
  // }

// Print function
printBookingDetails(): void {
  if (this.selectedBooking) {
     // Format the check-in and check-out dates
     const checkInDate = new Date(this.selectedBooking.checkin).toLocaleString('en-US', {
      weekday: 'short', // Abbreviated weekday (e.g., 'Mon')
      year: 'numeric', 
      month: 'short', // Abbreviated month (e.g., 'Jan')
      day: 'numeric', // Day of the month (e.g., '7')
      hour: '2-digit', // Hour (e.g., '11')
      minute: '2-digit', // Minute (e.g., '00')
      second: '2-digit', // Second (e.g., '00')
      hour12: true // 12-hour clock with AM/PM
    });

    const checkOutDate = new Date(this.selectedBooking.checkout).toLocaleString('en-US', {
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit', 
      hour12: true
    });
    let printContent = `
      <div style="display: flex; justify-content: space-between; padding: 20px;">
        <div style="width: 45%; padding-right: 20px;">
          <h3>Booking ID: ${this.selectedBooking.bookingid}</h3>
          <p style="margin-top: 20px;"><strong>First Name:</strong> ${this.selectedBooking.firstname}</p>
          <p style="margin-top: 20px;"><strong>Last Name:</strong> ${this.selectedBooking.lastname}</p>
          <p style="margin-top: 20px;"><strong>Email:</strong> ${this.selectedBooking.email}</p>
          <p style="margin-top: 20px;"><strong>Address 1:</strong> ${this.selectedBooking.address1}</p>
          <p style="margin-top: 20px;"><strong>Address 2:</strong> ${this.selectedBooking.address2}</p>
          <p style="margin-top: 20px;"><strong>Adults:</strong> ${this.selectedBooking.adults}</p>
          <p style="margin-top: 20px;"><strong>City:</strong> ${this.selectedBooking.city}</p>
         
        </div>

        <div style="width: 45%; margin-top: 35px;">
         <p style="margin-top: 20px;"><strong>State:</strong> ${this.selectedBooking.state}</p>
          <p style="margin-top: 20px;"><strong>Country:</strong> ${this.selectedBooking.country}</p>
          <!-- Conditionally add BHK counts -->
          ${this.selectedBooking.bhk1count ? `<p style="margin-top: 20px;"><strong>BHK1count:</strong> ${this.selectedBooking.bhk1count}</p>` : ''}
          ${this.selectedBooking.bhk2count ? `<p style="margin-top: 20px;"><strong>BHK2count:</strong> ${this.selectedBooking.bhk2count}</p>` : ''}
          ${this.selectedBooking.bhk3count ? `<p style="margin-top: 20px;"><strong>BHK3count:</strong> ${this.selectedBooking.bhk3count}</p>` : ''}

          <p style="margin-top: 20px;"><strong>Check In:</strong> ${checkInDate}</p>
          <p style="margin-top: 20px;"><strong>Check Out:</strong> ${checkOutDate}</p>
          <p style="margin-top: 20px;"><strong>Total Price:</strong> ${this.selectedBooking.totalprice}</p>
        </div>
      </div>
    `;

    if (printContent) {
      const printWindow = window.open('', '', 'height=600,width=800');

      printWindow?.document.write('<html><head><title>Booking Details</title>');
      printWindow?.document.write('<style>');
      printWindow?.document.write(`
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
          margin: 0;
        }
        h3 {
          color: brown;
        }
        p {
          font-size: 14px;
          margin: 8px 0;
        }
        strong {
          font-weight: bold;
        }
        div {
          margin-bottom: 20px;
        }
      `);
      printWindow?.document.write('</style></head><body>');

      printWindow?.document.write(printContent);

      printWindow?.document.write('</body></html>');
      printWindow?.document.close();
      printWindow?.print();
    }
  } else {
    console.log('No booking selected for printing');
  }
}
}
