import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { BookingModel } from 'src/app/model/booking.model';
import { FileuploadService } from 'src/app/services/fileupload.service';
import { GetguestdetailService } from 'src/app/services/getguestdetail.service';
import { GetroomlistService } from 'src/app/services/getroomlist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-frontdeskselectrooms',
  templateUrl: './frontdeskselectrooms.component.html',
  styleUrls: ['./frontdeskselectrooms.component.scss']
})
export class FrontdeskselectroomsComponent {
  selectRoomForm!: FormGroup
  bookingid: any;
  checkin: any;
  checkout: any;
  roomsListData: any
  bhks1: any;
  bhks2: any;
  bhks3: any;
  bhk12: any;
  roomsid: any;
  roomnos: any;
  bhkp1!: number;
  bhkp2!: number;

  dropdownList: any = [];
  dropdownList1: any = [];
  bhk2: any = [];

  selected: any = [];
  dropdownSettings1: any = {};
  dropdownSettings2: any = {};
  roomMap = new Map();
  bhk3: any = [];
  bhk23: any = [];
  arrayRoom: any = [];
  arrayRoom1: any = [];
  arrayRoom2: any = [];
  arrayRoom3:any =[];
  arrayRoom4:any =[];
  selectedItems = [];
  arr: any = [];
  arr1: any = [];
  roomidlist: any = [];
  roomidlist1: any;


  constructor(private homeroute: ActivatedRoute,
    private getguestdetail: GetguestdetailService,
    private router: Router,
    private fb: FormBuilder,
    private getroomlistservice: GetroomlistService,
  ) {


  }

  ngOnInit(): void {

    // this.getroomslist();
    this.homeroute.params.subscribe((params: Params) =>
      this.bookingid = params[('bookingid')],);
    this.homeroute.params.subscribe((params: Params) =>
      this.checkin = params[('checkin')],);
    this.homeroute.params.subscribe((params: Params) =>
      this.checkout = params[('checkout')],);
    this.homeroute.params.subscribe((params: Params) =>
      this.bhks1 = params[('bhk1')],);
    this.homeroute.params.subscribe((params: Params) =>
      this.bhks2 = params[('bhk2')],);
    this.homeroute.params.subscribe((params: Params) =>
      this.bhks3 = params[('bhk3')],);
    this.homeroute.params.subscribe((params: Params) =>
      this.roomsid = params[('rooms')],);
    this.homeroute.params.subscribe((params: Params) =>
      this.roomnos = params[('roomnos')],);
    this.bhkp1 = parseInt(this.bhks1);
    this.bhkp2 = parseInt(this.bhks2);
    this.bhk12 = this.bhkp1 + this.bhkp2

    console.log("bhk1", this.bhks1, "bhk2", this.bhks2, "bhk3", this.bhks3, "bhk12", this.bhk12)
    console.log("rooms", this.roomnos)
   
    this.arrayRoom = this.roomnos.split(",");

    this.selectRoomForm = this.fb.group({
      bookingid: [this.bookingid, Validators.required],
      bhk2: ['',],
      bhk3: ['',],
    })

    // this.dropdownList = [
    //       { item_id: 1, item_text: 'Mumbai' },
    //       { item_id: 2, item_text: 'Bangaluru' },
    //       { item_id: 3, item_text: 'Pune' },
    //       { item_id: 4, item_text: 'Navsari' },
    //       { item_id: 5, item_text: 'New Delhi' }
    // ];
    for (let i = 0; i < this.arrayRoom.length; i++) {
      var romnum = this.arrayRoom[i]
      // const roomnum=romnum
      this.arr.push(romnum);

    }
    console.log("array", this.arr);
    this.arr1.push({ item_text: this.arr });
    console.log("arr1", this.arr1)
    if (this.arr1[0].item_text.length > 0) {
      this.selected = this.arr1[0].item_text;
    } else {
      this.selected = this.bhk2;
    }

    console.log("selece", this.selected)
    // this.selectedItems = [
    //   { item_id: 1},
    //   { item_id: 4}
    // ];
    this.dropdownSettings1 = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      // selectAllText: 'Select All',
      // unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      // allowSearchFilter: true,
      limitSelection: this.bhk12
    };

    this.dropdownSettings2 = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      // selectAllText: 'Select All',
      // unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      // allowSearchFilter: true,
      limitSelection: this.bhks3
    };

    this.getroomslist();
  }
  onItemSelect(item: any) {

    console.log("1111", item);
    // for (let index = 0; index < item.length; index++) {
    //   const user = item[index];
    // this.selectedItems = []
    //   this.selectedItems.push(item)
    // // }
    // console.log("0000",this.selectedItems)
    // this.roomIdArray=[];
    // this.roomIdArray.push(item);
    // console.log("2222",this.roomIdArray);
    // this.roomMap.set("",item);
    // console.log("2222888",this.roomMap);
    //  for ( let value of this.roomMap.values()) {
    //         console.log("aa:",value);

    //      }
  }


  getroomslist() {
    console.log("daaaaaa", this.bookingid, this.checkin, this.checkout);
    let tmp: any = [];
    let tmp1: any = [];

    this.getguestdetail.getroomsList(this.bookingid, this.checkin, this.checkout).subscribe(res => {
      console.table("0000", res[0][0]);
      this.roomsListData = res[0][0];
      this.roomidlist=res[0][1];
      console.log("roomslistdata111", this.roomsListData);
      console.log("roomslistdata222", this.roomidlist);
      console.log("roomslistdata", this.roomsListData.roomnoss);
      console.log("roomslistdata2211", this.roomidlist.roomnoss);
      // for (let i = 0; i < 1; i++) {
      //   this.roomidlist = this.roomsListData[i].roomnoss
      //   // .replace("[", "",).replace("]","");

      //   console.log("rrrsdddd", this.roomidlist);
      // }

      for (let obj of this.roomsListData.roomnoss) {
        console.log("object:", obj);
        for (let key in obj) {
          console.log("key:", key, "value:", obj[key]);
          tmp.push({ item_id: key, item_text: obj[key] });
        }
      }
      console.log("tmp", tmp)
      this.dropdownList = tmp;

      // for (let i = 1; i <= 1; i++) {
      //   this.roomidlist1 = this.roomsListData[i].roomnoss
      //   console.log("rrrsdddd1", this.roomidlist1);
      // }

      for (let obj1 of this.roomidlist.roomnoss) {
        console.log("object:", obj1);
        for (let key in obj1) {
          console.log("key:", key, "value:", obj1[key]);
          tmp1.push({ item_id: key, item_text: obj1[key] });

        }
      }
      console.log("tmp1", tmp1)
      this.dropdownList1 = tmp1;
      // tmp1.push({ item_id:roomids , item_text: roomnos });

      // return this.dropdownList = tmp , this.dropdownList1 = tmp1; ;     
      // this.dropdownList1 = tmp3;  

    });
    //   console.log("dropdownList",this.dropdownList); 
  }
  

  roomCheckin() {
    const book = new BookingModel();
    const formData = this.selectRoomForm.value;
    console.log("form", formData);
    console.log("form1", formData.bhk2);
    console.log("form1", formData.bhk3);
    // this.arrayRoom = formData.bhk2.item_id;
    // console.log("arrayroom", this.arrayRoom);
    // this.arrayRoom=this.bhk2.concat(this.bhk3);
    for(let item of formData.bhk2){
      this.arrayRoom1.push(item.item_id);
      this.arrayRoom2.push(item.item_text);
    }
    console.log("1111concaat", this.arrayRoom1);
    console.log("123", this.arrayRoom2);

    for(let item of formData.bhk3){
      this.arrayRoom3.push(item.item_id);
      this.arrayRoom4.push(item.item_text);
    }
    console.log("333bhk", this.arrayRoom3);
    console.log("3bhk", this.arrayRoom4);

    var totroomid=this.arrayRoom1.concat(this.arrayRoom3);
    var totroomnoss=this.arrayRoom2.concat(this.arrayRoom4);

    book.bookingid = formData.bookingid;
    book.roomid = totroomid;
    book.roomnos = totroomnoss
    console.log("book", book);

    this.getroomlistservice.roomconfirm(book).subscribe(result => {
      console.log("res", result);
      this.selectRoomForm.reset();

      Swal.fire({
        confirmButtonColor: '#964B00',
        background: '#efc96a',
        text: result.message,
      });

      this.router.navigate(["frontdesk"]);
    })
  }
}

