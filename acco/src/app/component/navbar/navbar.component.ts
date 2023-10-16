import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  
  constructor(private http: HttpClient, private router: Router,private authService:AuthServiceService){}
  ngOnInit():void{}
  logout(){
    // localStorage.removeItem(accessToken);

   }
}
