import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { BookingModel } from 'src/app/model/booking.model';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { BookingServiceService } from 'src/app/services/booking-service.service';
import { GetUserServiceService } from 'src/app/services/get-user-service.service';
import { RoleService } from 'src/app/services/role.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cancelbooking',
  templateUrl: './cancelbooking.component.html',
  styleUrls: ['./cancelbooking.component.scss']
})
export class CancelbookingComponent  implements OnInit{
  userid:any;
  loginData:any;
  bookingCancelData:any;
  
 

  constructor (private roleService:RoleService,
    public authService:AuthServiceService,
    private getuserservice:GetUserServiceService,
    private bookingService:BookingServiceService,
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
       this.getMyBooking(this.userid);
       
    }
    getMyBooking(userid:any){
      this.getuserservice.canceledBooking(userid)
      // .subscribe((res)=>{
        .subscribe((result)=>{
        console.log(result);
       this.bookingCancelData=result;
      });
        
      }

     
        
      }

