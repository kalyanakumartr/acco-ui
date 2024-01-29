import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  constructor(private http:HttpClient ) {}
  
  fileUpload(fileToUpload: File): Observable<any> {
    console.log("I am fileupload");
    const endpoint = "http://localhost:3001/booking/idbookingproof";
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http.post(endpoint, formData, )
      // .map(() => { return true; })
      // .catch((e) => this.handleError(e));
}
}
