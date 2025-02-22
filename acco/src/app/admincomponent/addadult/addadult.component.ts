import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { MyLogic } from 'src/app/model/logic.model';
import { LogicService } from 'src/app/services/logic-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-addadult',
  templateUrl: './addadult.component.html',
  styleUrls: ['./addadult.component.scss']
})
export class AddadultComponent implements OnInit {
  @ViewChild('paginator')
  paginator!: MatPaginator;

  // formData = { price: 0,bed:0,noofrooms:0,bhktype1:0,bhktype2:0,bhktype3:0,optionType:'',roomTypeId:0,adultnumber:1};

  isModalOpen=false;

  PageSizes = [5, 10, 15];
  adultForm!: FormGroup;
  logicData: any;

  logic: MyLogic[] = [];
  // login.length
  logicdata=new MyLogic();
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
    console.log("Welcome to add adult service ");
    this.isModalOpen=true;
    const logic=new MyLogic();
    // logic.adult integ
    // logic.roomtypeid=parseInt;
    const formData = this.adultForm.value;
    logic.adult=formData.adultnumber;
    logic.roomtypeid=formData.roomTypeId;
    // logic.optiontype=formData.optionType;
    // logic.bhktype1=formData.bhktype1;
    // logic.bhktype2=formData.bhktype2;
    // logic.bhktype3=formData.bhktype3;
    // logic.bed=formData.bed;
    // logic.noofrooms=formData.noofrooms;
    // logic.price=formData.price;
        console.log("Logic formdata",logic);
        // console.log(result);
        console.log("url",    this.getlogicService.addadult());
        this.getlogicService.addadult()

    .subscribe((result:any)=>
    {
      console.log("res",result);
      Swal.fire({
        text: result.message,
        confirmButtonColor: '#964B00',
        background: '#efc96a',
      });
      this.closeCancelModal();
      // this.router.navigate(["cancelbooking",
    })
  }


  closeCancelModal(): void {
    this.isModalOpen = false;
    // this.formData = { bed: '' }; // Reset form
  }

  deladult(){

  }
  editadult(){

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
