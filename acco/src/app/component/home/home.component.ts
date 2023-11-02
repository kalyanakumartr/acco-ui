
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
 
  modalForm!:FormGroup;
  selectedValue: any = '';
  
  
  constructor(private fb: FormBuilder,private http: HttpClient, 
    private router: Router,
    
    ){}

  ngOnInit():void{   
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

  
}
