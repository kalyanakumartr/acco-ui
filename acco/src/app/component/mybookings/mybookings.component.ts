import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MyBooking } from 'src/app/model/mybooking.model';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-mybookings',
  templateUrl: './mybookings.component.html',
  styleUrls: ['./mybookings.component.scss']
})
export class MybookingsComponent  implements OnInit{
  userid:any;
  loginData:any;
  bookingData:any;
 

  constructor (private roleService:RoleService,public authService:AuthServiceService)
      {
        authService.apiData$.subscribe(data => this.loginData = data)
       
       
      }
      @ViewChild('paginator')
      paginator!: MatPaginator;
          
      ngAfterViewInit(){
        // this.bookingData.paginator=this.paginator;

      }
      
     
          


      
    ngOnInit(): void {
      this.userid=this.loginData.userid;
      console.log("id:",this.userid);
       this.getMyBooking(this.userid);
    }
      getMyBooking(userid:any){
      this.roleService.myBooking(userid)
      // .subscribe((res)=>{
        .subscribe((result)=>{
        console.log(result);
       this.bookingData=result;
      });
        
      }
}

