import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventInput, EventSourceFuncArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { CalenderService } from 'src/app/services/calender.service';
// import { CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-viewcalendar',
  templateUrl: './viewcalendar.component.html',
  styleUrls: ['./viewcalendar.component.scss']
})
export class ViewcalendarComponent implements OnInit {


  viewCalender:any;
  calenderItem:any = [];
  dataevent:any;
  constructor(
   
   
    public calenderService: CalenderService,
    public datepipe: DatePipe

  ) {  }

  ngOnInit(): void {
    
    //  this.getCalenderMonthly();
  }

  
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: (arg) => this.handleDateClick(arg),
    events:this.LoadEvents.bind(this)
    //  this.calenderItem
    // [
      
      // {
      //    title: 'event 1', date: '2024-05-01' },
      // { title: 'event 2', date: '2019-04-02' }
   // ]
  };

  handleDateClick(arg: DateClickArg) {
    alert('date click! ' + arg.dateStr)
  }


  async LoadEvents(args: EventSourceFuncArg): Promise<EventInput[]> {
    return new Promise<EventInput[]>((resolve) => {
      console.log("args",args);
      console.log("endstr",args.endStr.slice(0,10))
      console.log("start",args.startStr.slice(0,10))
      console.log("end",args.end.getDate());
      console.log(args.start.getFullYear(),"year",args.start.getDate(),"start",args.start.getMonth());

//       var month=args.start.getMonth();
//       var date=args.start.getDate();
//       var year=args.start.getFullYear();
//       var enddate=args.end.getDate();
// if(args.start.getDate()>20){
//   month=month+1;
// }
// var monthEnd=args.end.getDate()
// if(args.end.getDate()>20){
//   monthEnd = monthEnd+1;
// }

// var startDate= year + "-" + month + "-" + date;
// var endDate= year + "-" + month + "-" + enddate;

// console.log("month",month);
// console.log("startDate",startDate,"enddate",endDate);
      this.calenderService.getCalender(args.startStr.slice(0,10),args.endStr.slice(0,10)).subscribe(result => {
       
        console.log("result0",result);
        this.calenderItem=result.result[0][0];
        console.log("result",this.calenderItem);
        console.log("result1",this.calenderItem.tit)
        const events: EventInput[] = [];
        for(let i of this.calenderItem.tit){
          events.push({
            // id: val.bhk2count,
            title: i.title,
            date: i.date,
            color:i.color
            // .slice(0,10)
          },
          // {
          //   // id: val.bhk2count,
          //   title: i.title,
          //   date: i.date,
          //   color:i.color
          // }
        );
        }
        console.log("events",events);
        //  result.result[0].forEach(function (val:any) {
           console.log(result.result.length);
          
          
          resolve(events);
        });
      }, 
    );
  }

  // getCalenderMonthly(){
  //   this.calenderService.getCalender()
  //   // .subscribe((res)=>{
  //   .subscribe((result) => {
  //     console.log("roomtype:", result);
  //     this.viewCalender = result;
  //     result.result[0].forEach(function (val:any) {
  //       console.log(result.length);
  //       // const event: EventInput[] = [];
  //      this.calenderItem.push({
  //         id: val.bhk2count,
  //         title: val.bhk3count,
  //         date: val.indate,
  //         color:val.color
  //       });
  //       console.log("events", event);
  //     //   resolve(events);
  //     });
  //     // this.calenderItem = result.result[0].map((e: any) => ({ title: e.bhk2count ,  date: e.indate ,color:e.color}))
  //     // console.log("this.calenderItem", this.calenderItem);
      
  //     console.log("viewCalender", this.viewCalender);
  //     console.log("viewCalender1", this.viewCalender.result[0]);
  //     // this.calenderItem=this.viewCalender.result[0];
     
  //   });
  // }

}
