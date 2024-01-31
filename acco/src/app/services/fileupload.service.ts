import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  constructor(private http:HttpClient ) {}
  
  fileUpload(images: File,bookingid:any): Observable<any> {
    console.log("I am fileupload");
    console.log("img",images ,bookingid);
    const endpoint = "http://localhost:3001/booking/idbookingproof";
    const formData = new FormData();
    formData.append('images ',images,bookingid);
    formData.append('bookingid ',bookingid);
    console.log("000000",bookingid);
    return this.http.post(endpoint, formData)
      // .map(() => { return true; })
      // .catch((e) => this.handleError(e));
}
}
