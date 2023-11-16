
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GetRoomList } from 'src/app/model/getroomlist.model';
import { GetroomlistService } from 'src/app/services/getroomlist.service';


import Swal from 'sweetalert2';

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
  
  constructor(private fb: FormBuilder,private http: HttpClient, 
    private router: Router,private getroomlistservice:GetroomlistService
    
    ){}
    
  
  ngOnInit():void{   
    this.homeForm=this.fb.group({
      checkIn: ['', Validators.required],
      checkInTime: ['', Validators.required],
      checkOut: ['', Validators.required],
      checkOutTime: ['', Validators.required],
      adult: ['', Validators.required],
      child: ['', Validators.required],
      roomType: ['', Validators.required],
    })
   
      this.modalForm = this.fb.group({
    user: ['',], });
    // this.getFloor();
    // this.getroom();
  }
  modalProcess(){
    this.selectedValue = this.modalForm.controls['user'].value;
    console.log(this.selectedValue);    
    if(this.selectedValue == 'NewUser'){
      console.log(this.selectedValue);          
             this.router.navigate(["signup"]);             
    }else if(this.selectedValue=='ExistingUser'){
      console.log(this.selectedValue);     
      this.router.navigate(["login"]);
     
    }
    else{
      Swal.fire("Please select value");
    }
  }
  
  
  ReadMore:boolean = true

  //hiding info box
  visible:boolean = true
  facilities: boolean = true


  //onclick toggling both
  onclick()
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
  getFloor(){
    console.log("getfloor check purpose");
    return this.http.get("http://localhost:3001/users/getfloor").
    subscribe((res)=>{
      console.log(res);
     this. floorData=res;
      console.log(this.floorData);
      
    });
  }
  getroom(){
    console.log("getroom check purpose");
    return this.http.get("http://localhost:3001/users/getroom").
    subscribe((res)=>{
      console.log(res);
     this. floorRoom=res;
      console.log(this.floorRoom);
      
    });
  }

  checkAvailability(){
    const formData=this.homeForm.value;  
    const newRoom= new GetRoomList(); 
    newRoom.checkIn=formData.checkIn;
    newRoom.checkOut=formData.checkOut;
    newRoom.checkInTime=formData.checkOut;
    newRoom.checkOutTime=formData.checkOut;
    newRoom.adult=formData.adult;
    // this.adultNumber =baseCount.adult;
    
    console.log(newRoom);
   this.getroomlistservice.roomlist(newRoom).subscribe((res)=>{
    console.log(res);
    this.roomData=res;
            this.getroomlistservice.setData(this.roomData) 
            console.log("++++roomData:",this.roomData);
            console.log("0 value:",this.roomData[0].roomid);
            this.roomValue;
             this.router.navigate(["roomtype"]);
    
  });
  }
}
