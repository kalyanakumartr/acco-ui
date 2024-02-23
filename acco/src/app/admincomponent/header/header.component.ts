import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loginData:any;
  roleId: any;
  username:any;

  constructor(private http: HttpClient, private router: Router,
    // private getUserService:GetUserServiceService,
    public authService: AuthServiceService) {

      authService.apiData$.subscribe(data => this.loginData = data)
  }

  ngOnInit():void{
    
    this.roleId=localStorage.getItem('roleid');
    console.log("+++roleid",this.roleId);
    this. username = this.roleId == 1 ?"Hi Admin":this.roleId == 4?" Hi FrontOfficeExecutive":" Hi Manager";
    console.log("name:", this.loginData.username);
    console.log("name:",this.username);
  }
  logout() {
    //   //  localStorage.removeItem('token');
    //    this.router.navigate(["home"]) 
    //    console.log("++","logout sucessfully")

    this.authService.logout();
    this.router.navigate(["home"])


  }
}
