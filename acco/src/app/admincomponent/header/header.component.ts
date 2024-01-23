import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private http: HttpClient, private router: Router,
    // private getUserService:GetUserServiceService,
    public authService:AuthServiceService){
      
      
    }
  logout(){
    //   //  localStorage.removeItem('token');
    //    this.router.navigate(["home"]) 
    //    console.log("++","logout sucessfully")
       
       this.authService.logout();
  
      }
}
