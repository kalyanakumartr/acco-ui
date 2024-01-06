import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GetchargedamenityService } from 'src/app/services/getchargedamenity.service';
import { GetroomlistService } from 'src/app/services/getroomlist.service';

@Component({
  selector: 'app-roomtype',
  templateUrl: './roomtype.component.html',
  styleUrls: ['./roomtype.component.scss']
})
export class RoomtypeComponent implements OnInit {
  //  @Input() fd: any;

  roomData: any;
  chargedData: any;
  days: any;
  adult: any;
  cIn: any;
  cOut: any;
  selectedRow: any;
  child: any;
  roomtype: any;
  selectedAll: boolean = false;
  count = 0;
   roomMap = new Map();

  checkedList: any = [];
  priceList: any = [];

  currentSelected: {} | undefined;
  showDropDown!: boolean;
  checked: any;
  sumNumber: any;
  value: any;
  childAge: any = [];
  noOfRoom: any = [];
  bed: any;

  constructor(
    private getroomlistservice: GetroomlistService,
    private getChargedAmenity: GetchargedamenityService,
    private homeroute: ActivatedRoute,
    private router: Router,

  ) {


    getroomlistservice.apiRoom$.subscribe(data => this.roomData = data)

    this.selectedRow = [];

  }

  ngOnInit(): void {

    console.log("room:", this.roomData);
    console.log("value:", this.value)
    this.getChargedAmenities();

    this.homeroute.params.subscribe((params: Params) =>
      this.days = params[('days')],);
    this.homeroute.params.subscribe((params: Params) =>
      this.adult = params[('adult')],);
    this.homeroute.params.subscribe((params: Params) =>
      this.cIn = params[('cIn')],);
    this.homeroute.params.subscribe((params: Params) =>
      this.cOut = params[('cOut')],);
    this.homeroute.params.subscribe((params: Params) =>
      this.child = params[('child')],);
    this.homeroute.params.subscribe((params: Params) =>
      this.childAge = params[('childAge')],);
    this.homeroute.params.subscribe((params: Params) =>
      this.roomtype = params[('roomType')],);

    console.log("days:", this.days)
    console.log("adult:", this.adult)
    console.log("cIn:", this.cIn)
    console.log("cOut:", this.cOut)
    console.log("child:", this.child)
    console.log("childage:", this.childAge)
    console.log("roomtype:", this.roomtype)

    // for(let i=1;i<=this.roomData[1].avilable;i++){
    //   this.noOfRoom.push(i);

    // }
    // console.log("roomlist",this.noOfRoom)

  }
  inputnumber = 0;
  number = 0;
  bednumber = 0;
  foodnumber = 0;

  getChargedAmenities() {
    this.getChargedAmenity.getChargedData().subscribe((res) => {
      console.log(res);
      this.chargedData = res;
      console.log("++++chargedData:", this.chargedData);

    });
  }


  selectAll(index: any,) {
    if (typeof (index) == 'undefined') {
      this.selectedAll = !this.selectedAll;
      this.selectedRow = [];
    } else {
      this.selectedRow.push(index);
      console.log("rooooom", this.selectedRow);
    }
  }

  sendbookeddata(data: any) {
    console.log(data)
    this.router.navigate(["bookingsummary", {
      "id": this.checkedList,
      "name": data.roomname,
      "price": this.sumNumber,
      "nodays": this.days,
      "checkIn": this.cIn,
      "checkOut": this.cOut,
      "adult": this.adult,
      "child": this.child,
      "ageChild": this.childAge,
      "roomtype": this.roomtype,
    }]);

  }

  plus() {
    if (this.inputnumber < 6) {

      this.inputnumber = this.inputnumber + 1;
    }
  }
  plus1() {
    if (this.number < 6) {
      this.number = this.number + 1;
    }

  }
  plus2() {

    if (this.bednumber < 6) {
      this.bednumber = this.bednumber + 1;
    }
  }
  plus3() {
    if (this.foodnumber < 12) {
      this.foodnumber = this.foodnumber + 1;
    }
  }

  minus() {
    if (this.inputnumber != 0) {
      this.inputnumber = this.inputnumber - 1;
    }


  }
  minus1() {
    if (this.number != 0) {
      this.number = this.number - 1;
    }


  }
  minus2() {

    if (this.bednumber != 0) {
      this.bednumber = this.bednumber - 1;
    }

  }
  minus3() {
    if (this.foodnumber != 0) {
      this.foodnumber = this.foodnumber - 1;
    }
  }

  //   getSelectedValue(status:Boolean,value:String,price:String) {
  //     // this.count = 0;
  //     console.log("hi")
  //     if (status) {
  //       this.checkedList.push(value);
  //       this.priceList.push(price);
  //       // this.count = this.count + 1;

  //     } else {
  //       var index = this.checkedList.indexOf(value);
  //       this.checkedList.splice(index, 1);
  //       var index = this.priceList.indexOf(price);
  //       this.priceList.splice(index, 1);

  //     }

  //     this.sumNumber = this.priceList.reduce((acc, cur) => acc + Number(cur), 0)
  // console.log("sum:",this.sumNumber);
  // // console.log("count:",this.count)
  //   console.log("hiiiii")
  //     this.currentSelected = { checked : status,name:value,price:price};
  //     console.log("checked:",this.currentSelected);
  //     this.checked=this.currentSelected;
  //     console.log("ch:",this.checked);
  //     console.log("list",this.checkedList)
  //     console.log("price",this.priceList)

  // }



  getSelectedValue(value: any, name: any, price: any) {
    console.log("vvv", value)
    console.log("nam", name)
    console.log("price", price)

      this.roomMap.set(name,value);

      // this.roomlist.push(name,value);


      // var index = this.checkedList.indexOf(value);
      // if (index > -1) {
      //   this.checkedList.splice(index, 1);
      // }
    console.log("list", this.roomMap)


    this.priceList.push(price);
    console.log("price", this.priceList)


    var index = this.priceList.indexOf(value);
    if (index > -1) {
      this.priceList.pop(index, 1);
    }
    this.sumNumber = this.priceList.reduce((acc: number, cur: any) => acc + Number(cur), 0)
    console.log("sum:", this.sumNumber);



    // var index = this.checkedList.indexOf(value);
    // if (index > -1 && name=="2BHK") {
    //   this.checkedList.splice(index, 1);
    // }
    // console.log("list1",this.checkedList)
    // return this.checkedList;
  }



  onChangeBed(e: any) {
    if (e.target.checked) {
      this.bed = e.target.value;
      console.log("bed", this.bed)
    } else {
      // this.bed=e.target.value;
      console.log("bedoff")
    }
  }


}
