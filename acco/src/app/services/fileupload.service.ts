import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {


  constructor(private http:HttpClient ) {}
  
  fileUpload(images: File,bookingid:any): Observable<any> {
    console.log("I am fileupload");
    console.log("img",images ,bookingid);
    const endpoint = `${environment.idbookingproof}`;
    const formData = new FormData();
    formData.append('images',images);
    formData.append('bookingid',bookingid);
    console.log("000000",bookingid);
    return this.http.post(endpoint, formData)
      // .map(() => { return true; })
      // .catch((e) => this.handleError(e));
}
getimage(id:any){
  return this.http.get('http://localhost:3001/booking/getimage?bookingid='+id);
 
}
}
