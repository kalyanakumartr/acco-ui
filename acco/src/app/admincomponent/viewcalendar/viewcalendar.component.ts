import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
// import { CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-viewcalendar',
  templateUrl: './viewcalendar.component.html',
  styleUrls: ['./viewcalendar.component.scss']
})
export class ViewcalendarComponent {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: (arg) => this.handleDateClick(arg),
    events: [
      { title: 'event 1', date: '2019-04-01' },
      { title: 'event 2', date: '2019-04-02' }
    ]
  };

  handleDateClick(arg: DateClickArg) {
    alert('date click! ' + arg.dateStr)
  }
}
