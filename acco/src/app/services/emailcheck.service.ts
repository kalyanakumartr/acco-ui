import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class EmailcheckService {

  constructor(private http: HttpClient) { }

    emailverify(data: any): Observable<any> {
      console.log("email check",data)
      let params = new HttpParams().append("phonenumber",  data)
      // let queryParams = new HttpParams(data);
          return this.http.get(`${environment.phonenumVerfiy}`,{params});
        }
  }

  // emailverify(email: any): Observable<any> {
  //   console.log("email check", email)
  //   const url = 'http://localhost:3001/booking/emailverify';
  //   let queryParams = new HttpParams(email);
  //   return this.http.get(url, { params: queryParams });
  // }}
