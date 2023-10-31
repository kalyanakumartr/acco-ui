import { Injectable } from '@angular/core';
import { Role } from '../model/role.model';
import { environment } from '../environments/environments';
import{HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClient : HttpClient) { }

  // API_URL=`${environment.roleapiUrl}`;

  getrole(): Observable<Role[]>{
    console.log("getrole check purpose");
    // return this.httpClient.get<Role[]>(`${environment.roleapiUrl}`);
    return this.httpClient.get<Role[]>(`${environment.roleapiURL}`);
    
    
  }

}
