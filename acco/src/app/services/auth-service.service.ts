import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

import { environment } from '../environments/environments';
import { UserModel } from '../model/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  
  
  private apiData = new BehaviorSubject<any>(null);
  public apiData$ = this.apiData.asObservable();
  private currentUserSubject: BehaviorSubject<UserModel>;
  public currentUser: Observable<UserModel>;
  // public currentUser$: Observable<UserModel>;
  // public currentUserSubject: BehaviorSubject<UserModel>;

  // get currentUserValue(): UserModel {
  //   return this.currentUserSubject.value;
  // }

  // set currentUserValue(user: UserModel) {
  //   this.currentUserSubject.next(user);
  // }
  constructor( private http:HttpClient) {
      // this.currentUserSubject = new BehaviorSubject<UserModel>({});
  //   this.currentUser$ = this.currentUserSubject.asObservable();
  this.currentUserSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('currentUser')||'{}'));
  this.currentUser = this.currentUserSubject.asObservable();
   }
   public get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
}
// login(username: string, password: string) {
//   console.log("I am server");
//   return this.http.post<any>(`${environment.authURL}`, { username, password })
//       .pipe(map((user: UserModel) => {
//         console.log("Auth",user);
//           // login successful if there's a jwt token in the response
//           if (user && user.accesstoken) {
//               // store user details and jwt token in local storage to keep user logged in between page refreshes
//               localStorage.setItem('currentUser', JSON.stringify(user));
//               this.currentUserSubject.next(user);
//           }

//           return user;
//       }));
// }
  login(data: any):Observable<any>{
      console.log("I am server");
      return this.http.post(`${environment.authURL}`,data);
        
      };

      setData(loginData: any) { 
        this.apiData.next(loginData)
      }
      // logout(){
      //   localStorage.removeitem('token');
      // }
    }

   
    
  
  

