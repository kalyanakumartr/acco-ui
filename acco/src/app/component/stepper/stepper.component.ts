import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent {
  roomid: any;
  bhk: any;
  cin: any;
  cout: any;
  adults: any;
  price: any;
  noofdays: any;


  constructor(private builder: FormBuilder, private stepperroute: ActivatedRoute) { }
  isLinear = true;

  ngOnInit(): void {
    this.stepperroute.params.subscribe((params: Params) =>
      this.roomid = params[('roomid')],);
    this.stepperroute.params.subscribe((params: Params) =>
      this.bhk = params[('noofbhk')],);
    this.stepperroute.params.subscribe((params: Params) =>
      this.cin = params[('cIn')],);
    this.stepperroute.params.subscribe((params: Params) =>
      this.cout = params[('cOut')],);
    this.stepperroute.params.subscribe((params: Params) =>
      this.adults = params[('adult')],);
    this.stepperroute.params.subscribe((params: Params) =>
      this.noofdays = params[('days')],);
    this.stepperroute.params.subscribe((params: Params) =>
      this.price = params[('price')],);

    console.log(
      this.roomid,
      this.bhk,
      this.cin,
      this.cout,
      this.adults,
      this.price,
      this.noofdays

    )

  }


  Emailcheck = this.builder.group({
    EmailVerification: this.builder.group({
      Name: this.builder.control('', Validators.required),
      PhoneNumber: this.builder.control('', Validators.required),
      Email: this.builder.control('', Validators.required),
      otp: this.builder.control('', Validators.required)



    }),
    Payment: this.builder.group({
      payment: this.builder.control('', Validators.required),


    }),
  })
  get Basicform() {
    return this.Emailcheck.get("EmailVerification") as FormGroup;
  }
  get PaymentForm() {
    return this.Emailcheck.get("Payment") as FormGroup;
  }
  HandleSubmit() {
    if (this.Emailcheck.valid) {
      console.log(this.Emailcheck.value);
    }

  }
}