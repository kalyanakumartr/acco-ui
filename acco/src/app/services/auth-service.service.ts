import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

import { environment } from '../environments/environments';
import { UserModel } from '../model/auth.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GetroomlistService } from './getroomlist.service';
import { BookingModel } from '../model/booking.model';
import { BookingServiceService } from './booking-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private apiData = new BehaviorSubject<any>(null);
  public apiData$ = this.apiData.asObservable();
  authresults: any;
  session: boolean = false;
  loginData: any;
  roomBooking: any;


  // private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor(
    private http: HttpClient,
    private router: Router,
    private getroomlistservice: GetroomlistService,
    public bookingService: BookingServiceService,
  ) { }


  login(data: any, url: any): Observable<any> {
    console.log("I am server");
    console.log("recieved url", url)
    return this.http.post(`${environment.authURL}`, data)
      .pipe(map(result => {
        console.log(result);
        this.authresults = result;
        console.log(this.authresults.usertype)
        if (this.authresults.accesstoken) {
          this.loginData = result;
          this.setData(this.loginData)
          console.log("++++", this.loginData)
          localStorage.setItem('token', this.authresults.accesstoken);
          localStorage.setItem('roleid', this.authresults.roleid);
          console.log(this.authresults.accesstoken, this.authresults.usertype);
          //  this.loggedIn.next(true);

          if (this.authresults.usertype == "Admin" && url == "/adminlogin") {
            this.router.navigate(["admincomponent"])

          } else if (this.authresults.usertype == "Manager" && url == "/adminlogin") {
            this.router.navigate(["frontdesk"])

          }
          else if (this.authresults.usertype == "FrontOfficeExecutive" && url == "/adminlogin") {
            this.router.navigate(["frontdesk"])

          }
          else if (this.authresults.usertype == "Customer" && url == "/login") {
            const keys = ["checkin", "checkout", "adult", "child", "roomtype", "availStatus", "totaldays", "childage"];
            const storageData = keys.reduce((acc, key) => {
              acc[key] = localStorage.getItem(key);
              return acc;
            }, {} as Record<string, string | null>);

            console.log("checkin from auth service", storageData);

            if (storageData['availStatus'] === "Available") {
              this.getroomlistservice.roomlogic(storageData['adult'], storageData['checkin'], storageData['checkout'], storageData['roomtype'])
                .subscribe((result) => {
                  console.log(result);
                  const roomData = result[0];
                  this.getroomlistservice.setData(roomData);
                  console.log("++++roomData:", roomData);

                  // Create and populate the BookingModel object
                  const roomBooking = new BookingModel();
                  Object.assign(roomBooking, {
                    checkin: storageData['checkin'],
                    checkout: storageData['checkout'],
                    noofdays: storageData['totaldays'],
                    adults: storageData['adult'],
                    child: storageData['child'],
                    childage: storageData['childage'] ?? 0,
                    roomtypeid: storageData['roomtype'],
                    modeoftypeid: 1,
                  });

                  console.log("___+++", roomBooking);

                  this.bookingService.changeMessage(roomBooking);
                  this.router.navigate(["roomlogic"]);

                  // Clear relevant localStorage keys
                  keys.forEach(key => localStorage.removeItem(key));
                });
            } else {
              this.router.navigate(["home"]);
              keys.forEach(key => localStorage.removeItem(key));

            }
          }

        }
        // else {
        //   Swal.fire({
        //     text:
        //      "Invalid credentials,please check your username and password",
        //     // this.authresults.message,
        //     confirmButtonColor: '#964B00',
        //     background: '#efc96a',
        //   });
        // }

      }))



  };

  setData(loginData: any) {

    this.apiData.next(loginData)
  }

  //   get isUserLoggedIn() {
  //     return this.loggedIn.asObservable();
  //   }

  logged() {
    return localStorage.getItem('token');
  }

  logout() {

    localStorage.removeItem('token');
    localStorage.removeItem('roleid');

    // this.router.navigate(["home"])
  }
}






