import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailcheckService {

  constructor(private http: HttpClient) { }

    emailverify(data: any): Observable<any> {
      console.log("email check",data)
      let params = new HttpParams().append("phonenumber",  data)
      // let queryParams = new HttpParams(data);
          return this.http.get("http://localhost:3001/booking/emailverify",{params});
        }
  }

  // emailverify(email: any): Observable<any> {
  //   console.log("email check", email)
  //   const url = 'http://localhost:3001/booking/emailverify';
  //   let queryParams = new HttpParams(email);
  //   return this.http.get(url, { params: queryParams });
  // }}
