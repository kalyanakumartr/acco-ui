import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { MyLogic } from 'src/app/model/logic.model';
import { LogicService } from 'src/app/services/logic-service.service';
import Swal from 'sweetalert2';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-addadult',
  templateUrl: './addadult.component.html',
  styleUrls: ['./addadult.component.scss']
})
export class AddadultComponent implements OnInit {
  @ViewChild('paginator')
  paginator!: MatPaginator;
  logicid: any = '';
  selectedData: any = '';
  dataSource = new MatTableDataSource<MyLogic>();
  displayedColumns: string[] = ['logicid', 'adult', 'roomtypeid', 'optiontype', 'bhktype1', 'bhktype2', 'bhktype3', 'noofrooms', 'bed', 'price'
  ];
  selectedId: any = '';
  isModalOpen = false;
  PageSizes = [5, 10, 15];
  adultForm!: FormGroup;
  logicData: any;
  logic: MyLogic[] = [];
  logicdata = new MyLogic();
  public dataLogicData = new MatTableDataSource<MyLogic>();
  dataObs$!: Observable<any>;
  isDisabled: boolean = false;
  constructor(private router: Router, private _changeDetectorRef: ChangeDetectorRef,
    private getlogicService: LogicService, private fb: FormBuilder, private cdr: ChangeDetectorRef,

  ) {
    this.adultForm = new FormGroup({
      logicid: new FormControl(0, [Validators.required]),
      adult: new FormControl(null, [Validators.required]),
      roomtypeid: new FormControl(null, [Validators.required]),
      optiontype: new FormControl(null, [Validators.required]),
      bhktype1: new FormControl(null, [Validators.required]),
      bhktype2: new FormControl(null, [Validators.required]),
      bhktype3: new FormControl(null, [Validators.required]),
      noofrooms: new FormControl(null, [Validators.required]),
      bed: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),

    });


  }
  ngAfterViewInit() {
    this.dataLogicData.paginator = this.paginator;
  }
  ngOnInit(): void {
    // this.setPagination(this.logicData);
    this.getLogic();
    this.loadData();
    // this.adultForm = this.fb.group({
    //   adult: ['', [         Validators.required,        Validators.maxLength(2),      ]],
    //   roomtypeid: ['', [Validators.required]],
    //   optiontype: ['', [Validators.required]],
    //   bhktype1: ['', [Validators.required]],
    //   bhktype2: ['', [Validators.required]],
    //   bhktype3: ['', [Validators.required]],
    //   noofrooms: ['', [Validators.required]],
    //   bed: ['', [Validators.required]],
    //   price: ['', [Validators.required]]


    // })

  }


  loadData() {
      //  this.getlogicService.logic()
      //   .subscribe((result) => {
      //     console.log("Result", result);
      //     this.dataLogicData.data = result;
      //     console.log("datalogicData", this.dataLogicData.data = result);
      //     // )
      //     this.logicData = result;
      //     this.setPagination(this.logicData);
      //     // this.getuserservice.setData(this.bookingData)
      //     console.log("(((((", this.logicData);
      //   });

    console.log("Load Data St  in init stage");
    this.getlogicService.logic().subscribe({
      next: (result) => {
        this.dataSource = result;
        console.log("datasource",this.dataSource);
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  }


  addAdultMember() {
    // console.log("before select ",this.selectedId);
    // this.selectedId = this.adultForm.get('logicid')?.value;
    // console.log("after selectId",this.selectedId);
    console.log("Welcome to Add Ts File Customer");
    if (this.adultForm.valid) {
      if (this.adultForm.controls['logicid'].value > 0) {
        console.log("Get if  Logic ID>0");
        this.getlogicService.updateadult(this.adultForm.valid).subscribe({
          next: (response: any) => {
            console.log('Success:', response);
          },
          error: (err: any) => {

            console.error('Error:', err);
          }
        });
      } else {
        this.getlogicService.addadult(this.adultForm.valid).subscribe({
          next: (response: any) => {
            console.log('Success:', response);
          },
          error: (err: any) => {
            console.error('Error:', err);
          }
        })
      }
    }
  }


    editAdult(element: any): void {
          console.log("element", element);
        // this.adultForm.patchValue({adult: element.adult,roomtypeid: element.roomtypeid, optiontype: element.optiontype,
        //     bhktype1: element.bhktype1, bhktype2: element.bhktype2, bhktype3: element.bhktype3, noofrooms: element.noofrooms,
        //     bed: element.bed, price: element.Price});
      this.adultForm.setValue({
        logicid: element.logicid, adult: element.adult, roomtypeid: element.roomtypeid, optiontype: element.optiontype,
        bhktype1: element.bhktype1, bhktype2: element.bhktype2, bhktype3: element.bhktype3, noofrooms: element.noofrooms,
        bed: element.bed, price: element.Price
      });


    }

    // addAdultMember() {
    //   console.log("Welcome to Add Ts File Customer");
    //   if (this.adultForm.valid) {
    //     if(this.adultForm.controls["logicid"].value>0){
    //     console.log(this.adultForm.valid);
    //     const newAdultMember = this.adultForm.value;  // Get form data
    //     console.log('New Member:', newAdultMember);

    //     this.getlogicService.addadult(newAdultMember).subscribe(
    //       (response) => {
    //         console.log('Adult added successfully:', response);
    //         this.adultForm.reset();
    //         const modalElement = document.getElementById('newAdultMemberModal');
    //         const modal = bootstrap.Modal.getInstance(modalElement as Element);
    //         modal?.hide();
    //         this.router.navigate(["addadult"]);

    //         // this.isModalOpen = false;
    //         // this.cdr.detectChanges();

    //       },
    //       (error) => {
    //         console.log('Error adding member:', error);
    //       }
    //     )
    //   }
    // }


    title: string = "Add Adult";
    Changetitle(newTitle: string) {
      this.title = newTitle;
      document.title = newTitle;
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
          console.log("Logic Data", this.logicData);
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
