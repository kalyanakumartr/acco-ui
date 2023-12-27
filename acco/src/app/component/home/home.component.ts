
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GetRoomList } from 'src/app/model/getroomlist.model';
import { GetroomlistService } from 'src/app/services/getroomlist.service';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';


import Swal from 'sweetalert2';
import { GetroomtypeService } from 'src/app/services/getroomtype.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  homeForm!:FormGroup;
  modalForm!:FormGroup;
  selectedValue: any = '';
  floorData: any;
  floorRoom: any;
  inputnumber = 0;
  adultNumber:any;
  roomData:any;
  roomValue:any;
 checkOutCompleteDate:any;
 checkInCompleteDate:any;
 currentDate: any = new Date();
 Todaydate="2023-03-12"
 outDate="2023-03-12"
 select=null;

  
  constructor(private fb: FormBuilder,private http: HttpClient, 
    private router: Router,private getroomlistservice:GetroomlistService,
    private roomTypeService:GetroomtypeService
    
    ){}

    date1=new Date();
    currentyear=this.date1.getUTCFullYear();
    currentmonth=this.date1.getUTCMonth() +1;
    currentday=this.date1.getUTCDate();
    checkoutday=this.date1.getDate() + 1;
    currentmin=this.date1.getMinutes();
    currenthour=this.date1.getHours();
   
    finalmonth:any;
    finalday:any;
    finalOutday:any;
    tokenvalue:any;
    visibleRoom:any;
    
  ngOnInit():void{  

    this.showRoomType();
    this.tokenvalue=localStorage.getItem('token');
    if(this.currentmonth<10){
      this.finalmonth="0" +this.currentmonth;
    }else{
      this.finalmonth=this.currentmonth;
    }
    if(this.currentday<10){
      this.finalday="0" +this.currentday ;
    }else{
      this.finalday=this.currentday;
    }
    if(this.checkoutday<10){
      this.finalOutday="0" +this.checkoutday ;
    }else{
      this.finalOutday=this.checkoutday;
    }
    
    this.Todaydate=this.currentyear +"-"+this.finalmonth +"-"+this.finalday +" "+this.currenthour+":"+this.currentmin;
    this.outDate=this.currentyear +"-"+this.finalmonth +"-"+this.finalOutday +" "+this.currenthour+":"+this.currentmin;


    this.homeForm=this.fb.group({
      checkIn: ['', Validators.required],
      checkInTime: ['', Validators.required],
      checkOut: ['', Validators.required],
      checkOutTime: ['', Validators.required],
      adult: ['', Validators.required],
      child: ['0',[ Validators.required,MaxLengthValidator]],
      roomType: ['', Validators.required],
    })
   
    // for(let i=1;i<=9;i++){
    //   this.childAge.push(i);
    // }
    //   this.modalForm = this.fb.group({
    // user: ['',], });
    // this.getFloor();
    // this.getroom();


  }
  // modalProcess(){
  //   this.selectedValue = this.modalForm.controls['user'].value;
  //   console.log(this.selectedValue);    
  //   if(this.selectedValue == 'NewUser'){
  //     console.log(this.selectedValue);          
  //            this.router.navigate(["signup"]);             
  //   }else if(this.selectedValue=='ExistingUser'){
  //     console.log(this.selectedValue);     
  //     this.router.navigate(["login"]);
     
  //   }
  //   else{
  //     Swal.fire("Please select value");
  //   }
  // }
  
  
  ReadMore:boolean = true

  //hiding info box
  visible:boolean = false
  facilities: boolean = true
  samArray:any=[]
  childAge:any=[1,2,3,4,5,6,7,8,9]

  ValueEntered(value: any){
    console.log("djhckjkasj")
    this.samArray=[]

    for(let i=1;i<=value;i++){
      this.samArray.push(i)
    }
    console.log("cchhh",this.samArray)
  }

  //onclick toggling both
  clickon()
  {
     //not equal to condition
    this.visible = !this.visible
  }

  FirstFloor : boolean = true;
  FirstFloor1 : boolean = true;
  FirstFloor2 : boolean = true;
  ontouch()
  {
    this.facilities = !this.facilities
  }

toggleFirstFloor()
{
  this.FirstFloor = !this.FirstFloor;
}

toggleFirstFloor1()
{
  this.FirstFloor1 = !this.FirstFloor1;
}


toggleFirstFloor2()
{
  this.FirstFloor2 = !this.FirstFloor2;
}

plus()
  {
    if(this.inputnumber<6){    
   this.inputnumber = this.inputnumber+1;
    }
  }
  minus()
  {
    if(this.inputnumber != 0)
  {
   this.inputnumber = this.inputnumber-1;
  }
  
  }
  foodnumber = 0;
  plus3()
    {
      if(this.foodnumber<12){
        this.foodnumber = this.foodnumber+1;
      }
    }
    minus3()
  {
    if(this.foodnumber !=0)
    {
      this.foodnumber = this.foodnumber-1;
    }
  }
  // getFloor(){
  //   console.log("getfloor check purpose");
  //   return this.http.get("http://localhost:3001/users/getfloor").
  //   subscribe((res)=>{
  //     console.log(res);
  //    this. floorData=res;
  //     console.log(this.floorData);
      
  //   });
  // }
  // getroom(){
  //   console.log("getroom check purpose");
  //   return this.http.get("http://localhost:3001/users/getroom").
  //   subscribe((res)=>{
  //     console.log(res);
  //    this. floorRoom=res;
  //     console.log(this.floorRoom);
      
  //   });
  // }

  checkAvailability(){
if(this.tokenvalue==null){
  Swal.fire(" Please LOGIN if you are Existing user or SIGNUP for Newuser");
}else{
    const formData=this.homeForm.value; 
    console.log("chlid:",formData.child,formData.roomType)
    var inDate = new Date(formData.checkIn);
    var OutDate = new Date(formData.checkOut);
  
    var noofdays = (OutDate.getTime() - inDate.getTime())/ (1000 * 3600 * 24);
    console.log("nnnnn",noofdays);
    
    

   this.getroomlistservice.roomlist(formData.adult,formData.checkIn,formData.checkOut,noofdays).subscribe((res)=>{
    console.log(res);
    this.roomData=res;
            this.getroomlistservice.setData(this.roomData) 
            console.log("++++roomData:",this.roomData);
            console.log("0 value:",this.roomData[0].roomid);
            this.roomValue;
             this.router.navigate(["roomtype",{"days":noofdays,
             "adult":formData.adult,
             "cIn":formData.checkIn,
             "cOut":formData.checkOut,
             "child":formData.child,
             "roomType":formData.roomType,
            }]);
            //  "cIn":formData.checkIn,"cOut":formData.checkOut,
    
  });
  }
}

showRoomType(){
  this.roomTypeService.getRoomType()
  // .subscribe((res)=>{
    .subscribe((result)=>{
    console.log("roomtype:",result);    
     this. visibleRoom=result;
     console.log(this.visibleRoom);
  });

}

}
