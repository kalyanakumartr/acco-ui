import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FileuploadService } from 'src/app/services/fileupload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updateproof',
  templateUrl: './updateproof.component.html',
  styleUrls: ['./updateproof.component.scss']
})
export class UpdateproofComponent {

  images: File  | null= null;
  bookingid:any;


  constructor( 
    private homeroute: ActivatedRoute,
    private fileUploadService:FileuploadService,
     ){}

     ngOnInit(): void {
    
      // this.getroomslist();
      this.homeroute.params.subscribe((params: Params) =>
         this.bookingid = params[('bookingid')],);

     }

  onChange(event:any) { 
    this.images = event.target.files[0]; 
} 
   uploadFileToActivity() {
    
    console.log("file to upload")
    this.fileUploadService.fileUpload(this.images!,this.bookingid).subscribe(data => {
      // console.log("file000",data);
      Swal.fire({
        text:data.message,
        confirmButtonColor: '#964B00',
        background:'#efc96a',
      });
      // }, error => {
      //   console.log(error);
        
      // });
    });
  }

}
