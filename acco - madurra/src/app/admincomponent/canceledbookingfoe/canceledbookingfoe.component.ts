import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { GetguestdetailService } from 'src/app/services/getguestdetail.service';

@Component({
  selector: 'app-canceledbookingfoe',
  templateUrl: './canceledbookingfoe.component.html',
  styleUrls: ['./canceledbookingfoe.component.scss']
})
export class CanceledbookingfoeComponent implements OnInit{
  TodayDate="2022-12-11";
date1=new Date();
currentDate: any = new Date();
currentyear=this.date1.getUTCFullYear();
currentmonth=this.date1.getUTCMonth() +1;
currentday=this.date1.getUTCDate();
finalmonth:any;
finalday:any;
public databookingCancelData =new MatTableDataSource<any>();
  dataObs$!: Observable<any>;
  guestcancelData:any;

constructor( 
   private getguestdetail:GetguestdetailService,
  // private router: Router,
   private _changeDetectorRef: ChangeDetectorRef,
  ){
  // getguestdetail.getGuest$.subscribe(res => this.guestData = res);
  // console.log(this.guestData)
  
}

@ViewChild('paginator')
paginator!: MatPaginator;

ngAfterViewInit(){
  this.databookingCancelData.paginator=this.paginator;

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
  this.TodayDate=this.currentyear +"-"+this.finalmonth +"-"+this.finalday ;
   this.cancelbookingstatus(this.TodayDate);
   this.setPagination(this.guestcancelData);
}

cancelbookingstatus(seldate:any){
  console.log("daaaaaa",seldate);
  this.getguestdetail.getGuestCancelData(seldate).subscribe(res=>{
    console.table("0000",res[0]);
    this.guestcancelData=res[0]
    this.databookingCancelData.data=res[0];
    console.log("guestcanceldata",this.guestcancelData);
  });
}

setPagination(data:any) {
  this.databookingCancelData = new MatTableDataSource<any>(data);
  this._changeDetectorRef.detectChanges();
  this.databookingCancelData.paginator = this.paginator;
  this.dataObs$ = this.databookingCancelData.connect();
}

}
