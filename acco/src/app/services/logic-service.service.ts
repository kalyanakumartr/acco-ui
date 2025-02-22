import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { MyLogic } from '../model/logic.model';

@Injectable({
  providedIn: 'root'
})
export class LogicService {

  public messageSource  = new BehaviorSubject<any>(null);
  currentValue = this.messageSource.asObservable();

  constructor(private http:HttpClient,
 ) { }

  logic():Observable<any>{
    console.log("Check Logic Service");
    return this.http.get<any>(`${environment.getlogic}`);
  }

  addadult():Observable<any>{
    console.log("Add Adult Service ");
  return this.http.post<any>(`${environment.addadult}`,{MyLogic});
console.log("Got Service");
  }

  changeMessage(logic:any)
      {
        console.log("i am in Logic service")
          this.messageSource.next(logic);
      }



  }

