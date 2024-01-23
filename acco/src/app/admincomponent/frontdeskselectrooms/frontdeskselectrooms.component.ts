import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {  IDropdownSettings,  } from 'ng-multiselect-dropdown';
import { GetguestdetailService } from 'src/app/services/getguestdetail.service';

@Component({
  selector: 'app-frontdeskselectrooms',
  templateUrl: './frontdeskselectrooms.component.html',
  styleUrls: ['./frontdeskselectrooms.component.scss']
})
export class FrontdeskselectroomsComponent {
  bookingid:any;
  checkin:any;
  checkout:any;
  roomsListData:any
  dropdownList :any= [];
selectedItems :any=[];
dropdownSettings :any= {};
  constructor( private homeroute: ActivatedRoute,
    private getguestdetail:GetguestdetailService,
    private router: Router,
     ){
   
    
  }

  ngOnInit(): void {
    // this.getroomslist();
    this.homeroute.params.subscribe((params: Params) =>
       this.bookingid = params[('bookingid')],);
       this.homeroute.params.subscribe((params: Params) =>
       this.checkin = params[('checkin')],);
       this.homeroute.params.subscribe((params: Params) =>
       this.checkout = params[('checkout')],);
  
  
  // this.dropdownList = [
  //       { item_id: 1, item_text: 'Mumbai' },
  //       { item_id: 2, item_text: 'Bangaluru' },
  //       { item_id: 3, item_text: 'Pune' },
  //       { item_id: 4, item_text: 'Navsari' },
  //       { item_id: 5, item_text: 'New Delhi' }
  // ];
  this.selectedItems = [
    // { item_id: 2, item_text: 'Bangaluru' },
    //     { item_id: 3, item_text: 'Pune' },
  ];
  this.dropdownSettings =  {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    // selectAllText: 'Select All',
    // unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    // allowSearchFilter: true,
    limitSelection: 4
  };
  
   this.getroomslist();
  }
  onItemSelect(item: any) {
    console.log(item);
  }


  getroomslist(){
     console.log("daaaaaa",this.bookingid,this.checkin,this.checkout);
    let tmp : any =[];
    this.getguestdetail.getroomsList(this.bookingid,this.checkin,this.checkout).subscribe(res=>{
      console.table("0000",res[0]);
      this.roomsListData=res[0];
      console.log("roomslistdata",this.roomsListData);
      for(let i=0; i < this.roomsListData.length; i++) {
        tmp.push({ item_id:this.roomsListData[i].roomid , item_text: this. roomsListData[i].roomnos });
        
      }
      return this.dropdownList = tmp;     
      
    });
  //   console.log("dropdownList",this.dropdownList); 
   }
}
