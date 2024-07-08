import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  constructor(
    private router:Router
  ){}




  frontdeskreg(){
    this.router.navigate(["signup",{roleid:4}])

  }

  managerreg(){

    this.router.navigate(["signup",{roleid:2}])
  }
}
