import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
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
  isLoggedIn: boolean = false;
 
 homeurl=this.router.url;
 isDisabled=true;
 tokenvalue: string | null = null;
  username: string = "Welcome"; 
 marquee="Welcome to Maduraa Services -10% off for Margazhi Maha Utsavam";

  // getuser:GetUser[]=[];
  constructor(private http: HttpClient, private router: Router,
    private getUserService:GetUserServiceService,
    public authService:AuthServiceService,
    private cdr: ChangeDetectorRef
  ){
      authService.apiData$.subscribe(data => this.loginData = data)
      console.log("URLM",this.router.url);
       // Subscribe to login data changes
    authService.apiData$.subscribe((data) => {
      this.loginData = data;
      this.username = data ? `Welcome ${data.username}` : 'Welcome';
      this.cdr.detectChanges();
    });
    }
  ngOnInit():void{
    
    this.tokenvalue=localStorage.getItem('token');
    console.log("navtoken",this.tokenvalue)
    console.log("loginname",this.loginData.username)
   

    if (!this.tokenvalue) {
      this.username = "Welcome";
    } else {
      this.username = "Welcome " + (this.loginData?.username || "");
    }

    // Notify Angular of changes
    this.cdr.detectChanges();
    console.log("Final username:", this.username);
  
    // this. username = this.tokenvalue == null ? "Welcome" : "Welcome"+" "+this.loginData.username;
    // console.log("name:",this.username);
   
  }

  signup(){
    this.router.navigate(["signup",{roleid:3}])
  }
  
   
  logout(){
     
     this.authService.logout();
    
    this.router.navigate(["/home"]).then(() => {
      this.cdr.detectChanges();
      window.location.reload();
    });
      
      
    }
  
}
