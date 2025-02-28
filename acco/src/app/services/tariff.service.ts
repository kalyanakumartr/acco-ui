import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class TariffService {



  constructor(private http: HttpClient) { }


  gettariffamount(): Observable<any> {
    console.log("gettariffamount ")
    return this.http.get(`${environment.gettariffamount}`);
  }

  updateTariff(data:any): Observable<any>{
    console.log("updatetariff",data)
    return this.http.post<any>(`${environment.updateTariff}`,data);

  }

}
