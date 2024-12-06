import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { GetUser } from 'src/app/model/getuser.model';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { GetUserServiceService } from 'src/app/services/get-user-service.service';
import { LoginComponent } from '../login/login.component';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  userDetails:any;
  loginData:any;
 
 homeurl=this.router.url;
 isDisabled=true;
 tokenvalue:any;
 username:any;
 marquee="Welcome to  MaduraaServices -10% off for Margali Utasavam.";
  // getuser:GetUser[]=[];
  constructor(private http: HttpClient, private router: Router,
    private getUserService:GetUserServiceService,
    public authService:AuthServiceService){
      authService.apiData$.subscribe(data => this.loginData = data)
      console.log("URLM",this.router.url);
    }
  ngOnInit():void{
    
    this.tokenvalue=localStorage.getItem('token');
    console.log("navtoken",this.tokenvalue)
    this. username = this.tokenvalue == null ? "Welcome" : this.loginData.username;
    console.log("name:",this.username);
  }

  signup(){
    this.router.navigate(["signup",{roleid:3}])
  }
  
   
  logout(){
  //   //  localStorage.removeItem('token');
  //    this.router.navigate(["home"]) 
  //    console.log("++","logout sucessfully")
     
     this.authService.logout();
       this.router.navigate(["home"]) 

    }
  
}
