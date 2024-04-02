import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BookingModel } from 'src/app/model/booking.model';
import { GetroomtypeService } from 'src/app/services/getroomtype.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editflat',
  templateUrl: './editflat.component.html',
  styleUrls: ['./editflat.component.scss']
})
export class EditflatComponent {

  flatid: any;
  flattype: any;
  flatstatus: any;
  roomStatus: any;
  type: string = "room"
  editflatform!: FormGroup;

  constructor(
    private homeroute: ActivatedRoute,
    private fb: FormBuilder,
    private roomTypeService: GetroomtypeService,
    private router: Router,

  ) { }



  ngOnInit(): void {
    // this.imageUrll='https://www.w3schools.com/images/w3schools_green.jpg';

    // this.getroomslist();
    this.homeroute.params.subscribe((params: Params) =>
      this.flatid = params[('flatid')],);

    this.homeroute.params.subscribe((params: Params) =>
      this.flattype = params[('flattype')],);
    console.log("type", this.flattype)

    this.homeroute.params.subscribe((params: Params) =>
      this.flatstatus = params[('flatstatus')],);
    console.log("flatstatus", this.flatstatus)


    this.editflatform = this.fb.group({
      flatid: [this.flatid, Validators.required],
      flattype: [this.flattype, Validators.required],
      flatstatus: [this.flatstatus, Validators.required],
      updatestatus: ['0', Validators.required],
      reason: ['', Validators.required],

    })

    this.showRoomStatus();
  }

  showRoomStatus() {
    // const book = new BookingModel();
    // book.stastustype= "booking";
    this.roomTypeService.getRoomStatus(this.type)
      // .subscribe((res)=>{
      .subscribe((result) => {
        console.log("roomstatus:", result);
        this.roomStatus = result;
        console.log(this.roomStatus);
      });

  }

  editflatdata() {

    const book = new BookingModel();
    const formData = this.editflatform.value;

    book.roomid = formData.flatid;
    book.statusid = formData.updatestatus;
    // book.commands = formData.reason;
   
    console.log("book",book)

    this.roomTypeService.updateRoomStatus(book).subscribe((result:any) => {
      console.log("res", result);
      // this.cancelResult=result;
      Swal.fire({
        text: result.message,
        confirmButtonColor: '#964B00',
        background: '#efc96a',
      });
      this.router.navigate(["manageflats",
          
        ]);
    })

   }

}
