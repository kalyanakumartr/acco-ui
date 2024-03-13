import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, VERSION, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { UserModel } from 'src/app/model/auth.model';
import { RegisterServiceService } from 'src/app/services/register-service.service';
import Swal from 'sweetalert2';
import { matchpassword } from '../matchpassword/matchpassword.component';
import { City, Country, State } from 'country-state-city';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  user = new UserModel();
  eyeIcon: string = 'fa-eye-slash';
  isText: boolean = false;
  type: string = "password";
  eyeIcon1: string = 'fa-eye-slash';
  isText1: boolean = false;
  type1: string = "password";
  roleid: any

  @ViewChild('country') country!: ElementRef
  @ViewChild('city') city!: ElementRef
  @ViewChild('state') state!: ElementRef
  name = 'Angular ' + VERSION.major;
  countries = Country.getAllCountries();
  states: any = null;
  cities: any = null;

  selectedCountry: any;
  selectedState: any;
  selectedCity: any;



  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private registerService: RegisterServiceService,
    private activatedroute: ActivatedRoute

  ) { }
  ngOnInit(): void {
    this.activatedroute.params.subscribe((params: Params) =>
      this.roleid = params[('roleid')],);
    console.log("role", this.roleid)

    this.signupForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern("^[a-zA-Z ]{3,15}$")]],
      lastname: ['', [Validators.required, Validators.pattern("^[a-zA-Z ]*$")]],
      address1: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9,./ ]*$")]],
      address2: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9,./ ]*$")]],
      country: ['null', Validators.required],
      state: ['null', Validators.required],
      city: ['null', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern("^[0-9]{6}$")]],
      phonenumber: ['', [Validators.required, Validators.pattern("^[0-9]{0,10}$")]],
      email: ['', [Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      username: ['', [Validators.required, Validators.pattern("^[A-Za-z0-9-,@._]*$")]],
      password: ['', [Validators.required, Validators.pattern("^[a-zA-z0-9@.&_]{3,15}$")]],
      confirmpassword: ['', [Validators.required, Validators.pattern("^[a-zA-z0-9@.&_]{3,15}$")]],
      // "^[a-zA-z0-9@.&_]{8,15}$"
      // '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?_&])[A-Za-zd$@$!%*?_&].{8,15}'
      roleid: this.roleid


    },
      {
        validators: matchpassword
      }
    );
  }




  onCountryChange($event: any): void {
    this.states = State.getStatesOfCountry(JSON.parse(this.country.nativeElement.value).isoCode);
    this.selectedCountry = JSON.parse(this.country.nativeElement.value);
    this.cities = this.selectedState = this.selectedCity = null;
    console.log("country", this.selectedCountry)
  }

  onStateChange($event: any): void {
    this.cities = City.getCitiesOfState(JSON.parse(this.country.nativeElement.value).isoCode, JSON.parse(this.state.nativeElement.value).isoCode)
    this.selectedState = JSON.parse(this.state.nativeElement.value);
    this.selectedCity = null;
    console.log("state", this.selectedState)


  }

  onCityChange($event: any): void {
    this.selectedCity = JSON.parse(this.city.nativeElement.value)
    console.log("city", this.selectedCity)

  }

  // const matchpassword : ValidatorFn = (control: AbstractControl):ValidationErrors|null =>{

  //   let password = control.get('password');
  //   let confirmpassword = control.get('confirmpassword');
  //   if(password && confirmpassword && password?.value != confirmpassword?.value){
  //      return {
  //          passwordmatcherror : true }
  //   }
  //  return null; 
  // }
  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }
  hideShowPass1() {
    this.isText1 = !this.isText1;
    this.isText1 ? (this.eyeIcon1 = 'fa-eye') : (this.eyeIcon1 = 'fa-eye-slash');
    this.isText1 ? (this.type1 = 'text') : (this.type1 = 'password');
  }

  signupFormProcess() {
    const newuser = new UserModel();
    const formData = this.signupForm.value;
    newuser.firstname = formData.firstname;
    newuser.lastname = formData.lastname;
    newuser.email = formData.email;
    newuser.phonenumber = formData.phonenumber;
    newuser.address1 = formData.address1;
    newuser.address2 = formData.address2;
    newuser.city = this.selectedCity.name;
    newuser.state = this.selectedState.name;
    newuser.pincode = formData.pincode
    newuser.country = this.selectedCountry.name;
    newuser.username = formData.username;
    newuser.password = formData.password;
    newuser.cpassword = formData.confirmpassword;
    newuser.roleid = formData.roleid;
    // Swal.fire("Success");
    console.log("form", newuser);

    if (this.signupForm.valid) {
      console.log("form", newuser);

      this.registerService.register(newuser).
        subscribe(result => {

          console.log(result);
          // alert("login sucessful"); 
          this.signupForm.reset();
          Swal.fire({
            text: result.message,
            confirmButtonColor: '#964B00',
            background: '#efc96a',
          });
          this.router.navigate(["login"])

        })
    }
  }


}
