import { Component, Input, OnInit,} from '@angular/core';
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
  roomIds:any;
  selectedAll: boolean = false;
  count = 0;
   roomMap = new Map();
   priceMap = new Map();
   bedPrice = new Map();

  checkedList: any = [];
  priceList: any  = [];
  currentSelected: {} | undefined;
   sumNumber: any;
  value: any;
  childAge: any = [];
  noOfRoom: any = [];
  bedNo2BHK:any =[] ;
  bedNo3BHK:any =[] ;
  bed: any;
  totalValue="";
room2BHK:any;
room2BHKCount:any;
room3BHK:any;
room3BHKCount:any;
roomOccupancy:any;
roomOccuCount:any;
totalBedAmount:any;
totalBed:any;


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
//     console.log("___",this.roomData[1].price)
// for (let i=0;i<=10;i++){
//   var pr=i;
//   console.log("iii",pr)
//   var ad=this.roomData[1].price * pr;
//   var aa=this.roomData[2].price* pr
//   console.log("***",ad,"**",aa)
// }
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
      "id": this.room2BHKCount,
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

  counter(ibed: number,name:any) {
    console.log("NNN",name);      
    if(name=="2BHK"){
      this.bedNo2BHK=[];
      for(var i=0;i<ibed;i++){
        this.bedNo2BHK.push(i);
      }
    }else{
      this.bedNo3BHK=[];
      for(var i=0;i<ibed;i++){
        this.bedNo3BHK.push(i);
      }
    }
    
  //  this.bedNo= ibed;
   console.log("bbbb222",this.bedNo2BHK)
   console.log("bbbb333",this.bedNo3BHK)
    // return new Array(i);
}

  getSelectedValue(value: any, name: any, price: any) {
    this.counter(value,name);
   
    // console.log("vvv", value)
    // console.log("nam", name)
   
    // console.log("price++", price)

      this.roomMap.set(name,value);
      for ( let value of this.roomMap.values()) {
            console.log("aa:",value);
          
         }
 
         const sumUp=value*price;
         console.log("***",sumUp)
      this.priceMap.set(name,sumUp);
    
    console.log("list", this.roomMap);
    console.log("list1", this.priceMap)
    const roomArray = [Array.from(this.roomMap).reduce((acc, curr) => ({ 
      ...acc, 
      [curr[0]]: curr[1] 
  }), Object.create(null))];
  console.log("rrr",roomArray[0]);
  let roomValues = Object.values(roomArray[0]);
  let roomKeys = Object.keys(roomArray[0]);
  this.room2BHK=roomKeys[0];
  this.room2BHKCount=roomValues[0];
  this.room3BHK=roomKeys[1];
  this.room3BHKCount=roomValues[1];
  this.roomOccupancy=roomKeys[2];
  this.roomOccuCount=roomValues[2];

     const arr = [Array.from(this.priceMap).reduce((acc, curr) => ({ 
      ...acc, 
      [curr[0]]: curr[1] 
  }), Object.create(null))];
  
  console.log("rrr",arr[0]);
  let v = Object.values(arr[0]);
  console.log("price", v)

    this.sumNumber = v.reduce((acc: number, cur: any) => acc + Number(cur), 0)
    console.log("sum:", this.sumNumber);
  this.totalValue=this.sumNumber;
  console.log("tot:", this.totalValue);
  }



  selectedBed(value:any,name:any) {

    console.log("bed",value);
    this.bedPrice.set(name,value);
    console.log("bbbpppp:",this.bedPrice);
    const arrBedPrice = [Array.from(this.bedPrice).reduce((acc, curr) => ({ 
      ...acc, 
      [curr[0]]: curr[1] 
  }), Object.create(null))];
  
  console.log("rrr",arrBedPrice[0]);
  let vbed = Object.values(arrBedPrice[0]);
  console.log("exprice", vbed)

  this. totalBed= vbed.reduce((acc: number, cur: any) => acc + Number(cur), 0)
  console.log("sumbed:", this.totalBed);
  this. totalBedAmount=this.totalBed*299;
  console.log("+++",this. totalBedAmount);

  }
  

}
