import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GetroomtypeService } from 'src/app/services/getroomtype.service';

@Component({
  selector: 'app-manageflats',
  templateUrl: './manageflats.component.html',
  styleUrls: ['./manageflats.component.scss']
})
export class ManageflatsComponent implements OnInit{
 room:any;
 public dataroomData =new MatTableDataSource<any>();
  dataObs$!: Observable<any>;
  constructor( 
    // private getguestdetail:GetguestdetailService,
    private roomTypeService: GetroomtypeService,
    private router: Router,
    private _changeDetectorRef: ChangeDetectorRef,
    ){}
   

    @ViewChild('paginator')
    paginator!: MatPaginator;
    
    ngAfterViewInit(){
      this.dataroomData.paginator=this.paginator;
    
        
    }

    ngOnInit(): void {
      this.getMaintenanceRoom();
      this.setPagination(this.room);
    }

getMaintenanceRoom(){
  this.roomTypeService.getManageRoom()
  // .subscribe((res)=>{
    .subscribe((res)=>{
    console.log(res);   
    this.room=res; 
    console.log("res",this.room);  
    this.dataroomData.data=res;  
    // this.dataSource.data=res;    
    // console.log("datasource1",this.dataSource.data); 
  });
}


setPagination(data:any) {
  this.dataroomData = new MatTableDataSource<any>(data);
  this._changeDetectorRef.detectChanges();
  this.dataroomData.paginator = this.paginator;
  this.dataObs$ = this.dataroomData.connect();
}
editflat(id:any,room:any,status:any){
  this.router.navigate(['editflat',
  {
    "bookingid": id,
    'flattype':room,
    "flatstatus":status
    
   }])
}

}
