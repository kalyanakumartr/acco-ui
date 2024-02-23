import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {  IDropdownSettings,  } from 'ng-multiselect-dropdown';
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
  selectRoomForm!:FormGroup
  bookingid:any;
  checkin:any;
  checkout:any;
  roomsListData:any
  dropdownList :any= [];
  dropdownList1 :any= [];
bhk2 :any=[];
dropdownSettings :any= {};
roomMap = new Map();
bhk3:any=[];
bhk23:any=[];
arrayRoom:any=[];
images: File  | null= null;
 

  constructor( private homeroute: ActivatedRoute,
    private getguestdetail:GetguestdetailService,
    private router: Router,
    private fileUploadService:FileuploadService,
    private fb: FormBuilder,
    private getroomlistservice: GetroomlistService,
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
  
       this.selectRoomForm= this.fb.group({
        bookingid: this.bookingid,
        bhk2:['',],
       bhk3:['',],
      })
     
  // this.dropdownList = [
  //       { item_id: 1, item_text: 'Mumbai' },
  //       { item_id: 2, item_text: 'Bangaluru' },
  //       { item_id: 3, item_text: 'Pune' },
  //       { item_id: 4, item_text: 'Navsari' },
  //       { item_id: 5, item_text: 'New Delhi' }
  // ];
  this.bhk2 = [
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
    // limitSelection: 4
  };
  
   this.getroomslist();
  }
  onItemSelect(item: any) {
    
    console.log("1111",item);
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


  getroomslist(){
     console.log("daaaaaa",this.bookingid,this.checkin,this.checkout);
    let tmp : any =[];
    let tmp1 : any =[];
    this.getguestdetail.getroomsList(this.bookingid,this.checkin,this.checkout).subscribe(res=>{
      console.table("0000",res[0]);
      this.roomsListData=res[0];
      console.log("roomslistdata",this.roomsListData);
      for(let i=0; i < 1; i++) {
        const roomidlist=this.roomsListData[i].roomid.replace("[", "",).replace("]","");
       
       console.log("rrrsdddd",roomidlist);
       var roomids= roomidlist.split(',');

       console.log("rrr",roomids);
       
       var roomnos= this.roomsListData[i].roomnos.replace("[", "").replace("]", "").split(',');
       console.log(roomnos);
       
        tmp.push({ item_id:roomids , item_text: roomnos});
        console.log("tmp",tmp)
        // tmp1.push({ item_id:this.roomsListData[i].roomid , item_text: this. roomsListData[i].roomnos });
      }
      this.dropdownList = tmp[0].item_id;
      // const drop=this.dropdownList.flat();
      // console.log("tmp----", drop)
      for(let i=1; i <=1; i++) {
        const roomidlist1=this.roomsListData[i].roomid.replace("[", "",).replace("]","");
        var roomids= roomidlist1.split(',');
        console.log(roomids);
        var roomnos= roomidlist1.split(',');
        console.log(roomnos);
        
        tmp1.push({ item_id:roomids , item_text: roomnos });
      }
      // return this.dropdownList = tmp , this.dropdownList1 = tmp1; ;     
      this.dropdownList1 = tmp1[0].item_id;  
      
    });
  //   console.log("dropdownList",this.dropdownList); 
   }

   onChange(event:any) { 
    this.images = event.target.files[0]; 
} 
   uploadFileToActivity() {
    
    console.log("file to upload")
    this.fileUploadService.fileUpload(this.images!,this.bookingid).subscribe(data => {
      // console.log("file000",data);
      Swal.fire({
        text:data.message,
        confirmButtonColor: '#964B00',
        background:'#efc96a',
      });
      // }, error => {
      //   console.log(error);
        
      // });
    });
  }

  roomCheckin(){
    const book = new BookingModel() ;
    const formData = this.selectRoomForm.value;
    console.log("form",formData);
    
    this.arrayRoom=this.bhk2.concat(this.bhk3);
    console.log("1111concaat",this.arrayRoom);
    book.bookingid=formData.bookingid;
    book.roomid=this.arrayRoom;
    console.log("book",book);
    
    this.getroomlistservice.roomconfirm(book).subscribe(result=>{
      console.log("res",result);
   
      Swal.fire({
        confirmButtonColor: '#964B00',
        background:'#efc96a',
        text:result.message,
      });
    })
  }

}
