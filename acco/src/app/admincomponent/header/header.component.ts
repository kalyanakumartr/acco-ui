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
    this. username = this.roleId == 1 ?"Welcome Admin":this.roleId == 4?"Welcome Frontoffice":this.roleId == 3?"Welcome Manager":"";
    console.log("name:", this.loginData.username);
    console.log("name:",this.username);
  }
  logout() {
    //   //  localStorage.removeItem('token');
    //    this.router.navigate(["home"]) 
    //    console.log("++","logout sucessfully")

    this.authService.logout();
    this.router.navigate(["/frontdesk"]).then(() => {
      // this.cdr.detectChanges();
      window.location.reload();
    });
    // this.router.navigate(["frontdesk"])


  }
}
