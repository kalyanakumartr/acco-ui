// import { MyLogic } from './../../model/logic.model';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser'
// import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { MyLogic } from 'src/app/model/logic.model';
import { LogicService } from 'src/app/services/logic-service.service';


@Component({
  selector: 'app-addadult',
  templateUrl: './addadult.component.html',
  styleUrls: ['./addadult.component.scss']
})
export class AddadultComponent implements OnInit {
  @ViewChild('paginator')
  paginator!: MatPaginator;


  PageSizes = [5, 10, 15];
  adultForm!: FormGroup;
  logicData: any;

  logic: MyLogic[] = [];
  // login.length
  public dataLogicData = new MatTableDataSource<MyLogic>();

  dataObs$!: Observable<any>;
  isDisabled: boolean = false;
  constructor(private router: Router,
    private _changeDetectorRef: ChangeDetectorRef,
    private getlogicService: LogicService,

  ) {

  }




  ngAfterViewInit() {
    this.dataLogicData.paginator = this.paginator;

  }

  ngOnInit(): void {
    // this.setPagination(this.logicData);
    this.getLogic();

  }

  addadult() {

  }

  getLogic() {
    this.getlogicService.logic()
      .subscribe((result) => {
        console.log("Result", result);
        this.dataLogicData.data = result;
console.log(  "datalogicData",      this.dataLogicData.data = result);
// )
        this.logicData= result;
        this.setPagination(this.logicData);
        // this.getuserservice.setData(this.bookingData)
        console.log("(((((", this.logicData);
  });

  }

  setPagination(data: any) {
    console.log("++++1111", MyLogic)
    this.dataLogicData = new MatTableDataSource<any>(data);
        this.dataLogicData.paginator = this.paginator;
    this.dataObs$ = this.dataLogicData.connect();
    console.log("this.dataObs", this.dataObs$)

  }

  // getMyBooking(userid: any) {
  //   // this.bookingData.clear();
  //   this.getuserservice.myBooking(userid)
  //     // .subscribe((res)=>{
  //     .subscribe((result) => {
  //       console.log(result);
  //       this.databookingData.data = result;
  //       console.log("))))00000", this.databookingData.data)
  //       this.bookingData = result;
  //       // this.getuserservice.setData(this.bookingData)
  //       console.log("(((((", this.bookingData);


addAdultEditData(){

}

}
