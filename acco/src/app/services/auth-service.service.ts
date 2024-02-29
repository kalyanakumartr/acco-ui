import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

import { environment } from '../environments/environments';
import { UserModel } from '../model/auth.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private apiData = new BehaviorSubject<any>(null);
  public apiData$ = this.apiData.asObservable();
  authresults: any;
  session: boolean = false;
  loginData: any;

  // private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor(private http: HttpClient, private router: Router,

  ) { }

  login(data: any): Observable<any> {
    console.log("I am server");
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

          if (this.authresults.usertype == "Admin") {
            Swal.fire({
              text:
                this.authresults.message,
              confirmButtonColor: '#964B00',
              background: '#efc96a',
            });
            this.router.navigate(["admin"])

          } else if (this.authresults.usertype == "Manager") {
            Swal.fire({
              text:
                this.authresults.message,
              confirmButtonColor: '#964B00',
              background: '#efc96a',
            });
            this.router.navigate(["frontdesk"])

          }
          else if (this.authresults.usertype == "FrontOfficeExecutive") {
            Swal.fire({
              text:
                this.authresults.message,
              confirmButtonColor: '#964B00',
              background: '#efc96a',
            });
            this.router.navigate(["frontdesk"])

          } else {
            Swal.fire({
              text:
                this.authresults.message,
              confirmButtonColor: '#964B00',
              background: '#efc96a',
            });
            this.router.navigate(["mybookings"])
          }

        } else {
          Swal.fire({
            text:
              this.authresults.message,
            confirmButtonColor: '#964B00',
            background: '#efc96a',
          });
        }
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
    //  this.router.navigate(["home"])
  }
}






