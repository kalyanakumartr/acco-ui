import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-mybookings',
  templateUrl: './mybookings.component.html',
  styleUrls: ['./mybookings.component.scss']
})
export class MybookingsComponent  implements OnInit{
  public displayedColumns =['checkin','checkout','adults','child','noofflats','flatno','totalcost','bookingno','option'];
  public dataSource=new MatTableDataSource<any>();

  constructor (private roleService:RoleService)
      {
        console.log("display",this.displayedColumns);
        console.log("datasource",this.dataSource); 
      }
      
      @ViewChild('paginator')
  paginator!: MatPaginator;
      

      PageSizes=[3,5,7];
      


      ngAfterViewInit(){
        this.dataSource.paginator=this.paginator;

      }
    ngOnInit(): void {
        this.getMyBooking();
    }
      getMyBooking(){
      this.roleService.myBooking()
      // .subscribe((res)=>{
        .subscribe((result)=>{
        console.log(result);
        this.dataSource.data=result;
        console.log("datasource",this.dataSource.data); 
      });
        
      }
}

