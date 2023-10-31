import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { GetUser } from 'src/app/model/getuser.model';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { GetUserServiceService } from 'src/app/services/get-user-service.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  userDetails:any;
  // getuser:GetUser[]=[];
  constructor(private http: HttpClient, private router: Router,
    private getUserService:GetUserServiceService){}
  ngOnInit():void{
  //   this.showUser();
   }
  logout(){
    // localStorage.removeItem(accessToken);

   }
  //  showUser(){
  //   this.getUserService.getUser()
  //   .subscribe((res)=>{
  //     console.log("@@@@",res);
  //     this.userDetails=res;
  //     console.log("userdetails:",this.userDetails); 
  //   });
  //     }
}
