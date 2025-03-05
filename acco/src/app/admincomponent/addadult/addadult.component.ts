import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
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

  isModalOpen = false;

  PageSizes = [5, 10, 15];
  adultForm!: FormGroup;
  logicData: any;

  logic: MyLogic[] = [];
  // login.length
  logicdata = new MyLogic();
  public dataLogicData = new MatTableDataSource<MyLogic>();

  dataObs$!: Observable<any>;
  isDisabled: boolean = false;
  constructor(private router: Router,
    private _changeDetectorRef: ChangeDetectorRef,
    private getlogicService: LogicService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,

  ) {

  }
ngAfterViewInit() {
    this.dataLogicData.paginator = this.paginator;
  }
  ngOnInit(): void {
    // this.setPagination(this.logicData);
    this.getLogic();
    this.adultForm = this.fb.group({
      adult: ['', [
        Validators.required,
        Validators.maxLength(2),
        // Validators.pattern('^[a-zA-Z .-]+$') // Only letters, spaces, periods, and hyphens
      ]],
      roomtypeid: ['', [Validators.required]],
      optiontype: ['', [Validators.required]],
      bhktype1: ['', [Validators.required]],
      bhktype2: ['', [Validators.required]],
      bhktype3: ['', [Validators.required]],
      noofrooms: ['', [Validators.required]],
      bed: ['', [Validators.required]],
     price : ['', [Validators.required]]


    })

  }


  addAdultMember() {
    console.log("Welcome to Add Ts File Customer");
    if (this.adultForm.valid) {
      console.log(this.adultForm.valid);
      const newAdultMember = this.adultForm.value;  // Get form data
      console.log('New Member:', newAdultMember);

      this.getlogicService.addadult(newAdultMember).subscribe(
        (response) => {
          console.log('Adult added successfully:', response);
          this.adultForm.reset();
          const modalElement = document.getElementById('newAdultMemberModal');
          const modal = bootstrap.Modal.getInstance(modalElement as Element);
          modal?.hide();
          this.router.navigate(["addadult"]);

          // this.isModalOpen = false;
          // this.cdr.detectChanges();

        },
        (error) => {
          console.log('Error adding member:', error);
        }
      )
    }
  }

title: string="Add Adult";
  Changetitle(newTitle:string){
    this.title=newTitle;
    document.title=newTitle;
  }
  closeCancelModal(): void {
    this.isModalOpen = false;
    // this.formData = { bed: '' }; // Reset form
  }

  deladult() {

  }
  editadult() {

  }

  getLogic() {
    this.getlogicService.logic()
      .subscribe((result) => {
        console.log("Result", result);
        this.dataLogicData.data = result;
        console.log("datalogicData", this.dataLogicData.data = result);
        // )
        this.logicData = result;
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


  addAdultEditData() {

  }

}
