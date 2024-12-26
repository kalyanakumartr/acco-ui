import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/model/auth.model';
import { RegisterServiceService } from 'src/app/services/register-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit{
  contactForm!:FormGroup;

  constructor(private fb: FormBuilder,
    private http: HttpClient, 
    private router: Router,
    private registerService:RegisterServiceService,
    
    ){}
ngOnInit():void{
  this.contactForm = this.fb.group({
    name: ['', [ Validators.required,Validators.pattern("^[a-zA-Z ]{3,15}$")]],
    email:['',[ Validators.required,Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    phonenumber: ['',[Validators.required,Validators.pattern("^[0-9]{0,10}$")]],
    city: ['', [ Validators.required,Validators.pattern("^[a-zA-Z ]*$")]],
    message: ['', [ Validators.required,Validators.pattern("^[a-zA-Z ]*$")]],
  })
}

// display: any;
//     center: google.maps.LatLngLiteral = {
//         lat: 10.857197866699392,
//         lng: 78.70237868620065
//     };
//     zoom = 6;

//     /*------------------------------------------
//     --------------------------------------------
//     moveMap()
//     --------------------------------------------
//     --------------------------------------------*/
//     moveMap(event: google.maps.MapMouseEvent) {
//         if (event.latLng != null) this.center = (event.latLng.toJSON());
//     }

//     /*------------------------------------------
//     --------------------------------------------
//     move()
//     --------------------------------------------
//     --------------------------------------------*/
//     move(event: google.maps.MapMouseEvent) {
//         if (event.latLng != null) this.display = event.latLng.toJSON();
//     }
// Set map center to Tiruchirappalli
center: google.maps.LatLngLiteral = {
  lat: 10.8571, // Tiruchirappalli Latitude
  lng: 78.7023, // Tiruchirappalli Longitude
};
zoom = 13; // Zoom level suitable for city view
display: google.maps.LatLngLiteral | null = null; // Display coordinates for mouse move

/*------------------------------------------
Update map center on click
------------------------------------------*/
moveMap(event: google.maps.MapMouseEvent): void {
  if (event.latLng) {
    this.center = event.latLng.toJSON();
    this.display = event.latLng.toJSON();
  }
}

/*------------------------------------------
Update displayed coordinates on mouse move
------------------------------------------*/
move(event: google.maps.MapMouseEvent): void {
  if (event.latLng) {
    this.display = event.latLng.toJSON();
  }
}


contactFormProcess(){
  const newuser = new UserModel() ;
  const formData = this.contactForm.value;
  newuser.name = formData.name;
  newuser.email = formData.email;
  newuser.phonenumber = formData.phonenumber;
  newuser.city = formData.city;
  newuser.message = formData.message;

  if(this.contactForm.valid){
    console.log(newuser);

    this.registerService.contactus(newuser).    
    subscribe( result=>{
     
       console.log(result);
        // alert("login sucessful"); 
        this.contactForm.reset();
        Swal.fire({
          text:result.message,
          confirmButtonColor: '#964B00',
          background:'#efc96a',
        });      
        //  this.router.navigate(["login"])
     
    })
  }
}

}
