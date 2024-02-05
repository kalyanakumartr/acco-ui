import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { BookingModel } from 'src/app/model/booking.model';
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
export class MybookingsComponent  implements OnInit{
  // private apiData = new BehaviorSubject<any>(null);
  // public apiData$ = this.apiData.asObservable();
  userid:any;
  loginData:any;
  bookingData:any;
  roomBooking:any
  // static apiData$: any;
  
 

  constructor (private roleService:RoleService,
    public authService:AuthServiceService,
    private getuserservice:GetUserServiceService,
    private bookingService:BookingServiceService,
    private router: Router,
    )
      {
        authService.apiData$.subscribe(data => this.loginData = data)
        
      }
      
      @ViewChild('paginator')
  paginator!: MatPaginator;
      

      // PageSizes=[3,5,7];
      


      ngAfterViewInit(){
        // this.bookingData.paginator=this.paginator;

      }
    ngOnInit(): void {
      this.userid=this.loginData.userid;
      console.log("id:",this.userid);
      this.bookingData="";
       this.getMyBooking(this.userid);
       
       
    }
    getMyBooking(userid:any){
      // this.bookingData.clear();
      this.getuserservice.myBooking(userid)
      // .subscribe((res)=>{
        .subscribe((result)=>{
        console.log(result);
         
       this.bookingData=result;
       console.log("(((((",this.bookingData);
       console.log("((((()))",this.bookingData[0].checkin);
       console.log("((((()))adults",this.bookingData[0].adults);
      //  this.setData(this.bookingData)
      });
        
      }

  cancelBooking(id:any){
    
        console.log("cancel");
        const book = new BookingModel() ;
        book.bookingid=id;
        book.userid= this.userid
        this.bookingService.bookingCancel(book).subscribe( result=>{   
              console.log("res",result);
                    Swal.fire({
            text:result.message,
            confirmButtonColor: '#964B00',
            background:'#efc96a',
          });
        })
      }

      // setData(bookingData: any) {
      //   this.apiData.next(bookingData)
      // }
        
      bookingview(){
        this. roomBooking= new BookingModel();
        this. roomBooking.checkin=this.bookingData[0].checkin,
        this.roomBooking.checkout=this.bookingData[0].checkout,
        this.roomBooking.roomtype=this.bookingData[0].roomtype,
        this.roomBooking.totalprice=this.bookingData[0].totalprice,
        this. roomBooking.bookingid=this.bookingData[0].bookingid,
        this. roomBooking.adults=this.bookingData[0].adults,
        this. roomBooking.child=this.bookingData[0].child,
        
        console.log("0000000",this.roomBooking)
        this.bookingService.changeMessage(this.roomBooking);
        this.router.navigate(["bookingdetails", 
        
      ]);

      }

      }


// function data(value: string): void {
//   throw new Error('Function not implemented.');
// }

