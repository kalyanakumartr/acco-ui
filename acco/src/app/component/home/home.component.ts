
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  
  
  constructor(private fb: FormBuilder,private http: HttpClient, 
    private router: Router,
    
    ){}

  ngOnInit():void{   
    this.homeForm=this.fb.group({
      home: ['', Validators.required]
    })
      this.modalForm = this.fb.group({
    user: ['',],
   
    
      });
  }
  modalProcess(){
    this.selectedValue = this.modalForm.controls['user'].value;
    console.log(this.selectedValue);
    
    if(this.selectedValue == 'NewUser'){
      console.log("check");
          
             this.router.navigate(["signup"]);
             this.modalForm.reset(); 
    }else if(this.selectedValue=='ExistingUser'){
      
      this.router.navigate(["login"]);
      this.modalForm.reset();
    }else{
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
inputnumber = 0;
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
  
}
