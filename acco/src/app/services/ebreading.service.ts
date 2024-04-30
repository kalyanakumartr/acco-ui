import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { EBModel } from '../model/eb.model';

@Injectable({
  providedIn: 'root'
})
export class EbreadingService {

  constructor(private http:HttpClient) { }

  readingEB(ebbook:EBModel):Observable<EBModel>{
    console.log("I am ebreding");
    console.log("ebreding",ebbook);
    return this.http.post<EBModel>(`${environment.addebreading}`,ebbook);
  }

  ebPrice():Observable<any>{
    console.log("Getebprice"); 
    return this.http.get(`${environment.getebdata}`);
  }
  EBClosing(ebclose:EBModel):Observable<EBModel>{
    console.log("I am ebreding");
    console.log("ebreding",ebclose);
    return this.http.post<EBModel>(`${environment.updateebreading}`,ebclose);
  }
 
    ebOpeningReading(id:any):Observable<any>{
      console.log("Getebopeningunit"); 
      return this.http.get(`${environment.getebreading}`+id);
    }

}
