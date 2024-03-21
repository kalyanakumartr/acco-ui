import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-editflat',
  templateUrl: './editflat.component.html',
  styleUrls: ['./editflat.component.scss']
})
export class EditflatComponent {

  flatid: any;
  flattype:any;
  flatstatus:any;

  editflatform!: FormGroup;


  constructor(
    private homeroute: ActivatedRoute,
    private fb: FormBuilder,

  ) { }


  ngOnInit(): void {
    // this.imageUrll='https://www.w3schools.com/images/w3schools_green.jpg';

    // this.getroomslist();
    this.homeroute.params.subscribe((params: Params) =>
      this.flatid = params[('flatid')],);

    this.homeroute.params.subscribe((params: Params) =>
      this.flattype = params[('flattype')],);
      console.log("type",this.flattype)

    this.homeroute.params.subscribe((params: Params) =>
      this.flatstatus = params[('flatstatus')],);
      console.log("flatstatus",this.flatstatus)


    this.editflatform = this.fb.group({
      bookingid: [this.flatid, Validators.required],
      flattype: [this.flattype, Validators.required],
      flatstatus: [this.flatstatus, Validators.required],
      updatestatus: ['0', Validators.required],
      reason: ['', Validators.required],



    })
  }

  editflatdata() { }

}
