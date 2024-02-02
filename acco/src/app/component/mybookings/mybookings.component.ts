import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
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
  userid:any;
  loginData:any;
  bookingData:any;
  
 

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
      this.getuserservice.myBooking(userid)
      // .subscribe((res)=>{
        .subscribe((result)=>{
        console.log(result);
         
       this.bookingData=result;
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
        
      }


// function data(value: string): void {
//   throw new Error('Function not implemented.');
// }

