import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { every } from 'rxjs';
import { FileuploadService } from 'src/app/services/fileupload.service';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-updateproof',
  templateUrl: './updateproof.component.html',
  styleUrls: ['./updateproof.component.scss']
})
export class UpdateproofComponent {

  images: File | null = null;
  bookingid: any;
  selectRoomForm!: FormGroup;
  filedata: any;
  filename: any;
  imageUrl: any;
  imageUrll:any;
  thumbnail: any;



  constructor(
    private homeroute: ActivatedRoute,
    private fileUploadService: FileuploadService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer

  ) { }

  ngOnInit(): void {
    // this.imageUrll='https://www.w3schools.com/images/w3schools_green.jpg';

    // this.getroomslist();
    this.homeroute.params.subscribe((params: Params) =>
      this.bookingid = params[('bookingid')],);

    this.selectRoomForm = this.fb.group({
      bookingid: [this.bookingid, Validators.required],
      upload: ['', Validators.required]

    })

    this.getimage();
this.getimagenew(Event);
  }

  getimagenew(event:any){
if(event.target.files)
{
  var render=new FileReader();
  render.readAsDataURL(event.target.files[0]);
  render.onload=(event:any)=>{
    this.imageUrl=event.target.result;
  }
}
  }
  onChange(event: any) {
    this.images = event.target.files[0];
  }
  uploadFileToActivity() {
    console.log("file to upload")
    if (this.selectRoomForm.valid) {
      this.fileUploadService.fileUpload(this.images!, this.bookingid).subscribe(data => {
        // console.log("file000",data);
        Swal.fire({
          text: data.message,
          confirmButtonColor: '#964B00',
          background: '#efc96a',
        });
        // }, error => {
        //   console.log(error);

        // });
      });
    }
  }

  getimage() {
    this.imageUrl='http://localhost:3001/booking/getidproofimage?bookingid='+this.bookingid;
            // this.thumbnail = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.imageUrl}`);
 

    // this.fileUploadService.getimage(this.bookingid).subscribe(data => {
      // if (data) {
        // console.log("image", data);
        // this.filedata = data;
        // this.filename = this.filedata.FileName1;
        // console.log("filename", this.filename);

        // var bytes = data; 
        // console.log("bytes",bytes);
        // get from server
        // let imageBinary = bytes; //image binary data response from api
        // let imageBase64String = btoa(bytes);
        // this.imageUrl = 'data:image/jpeg;base64,' + data;
                // this.imageUrl = 'data:image/jpeg;base64,' + data;
        // this.thumbnail = this.sanitizer.bypassSecurityTrustResourceUrl(this.imageUrl);
        
        // this.thumbnail = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpeg;base64, ,${this.imageUrl}`);
        // use this in <img src="..."> binding

        //       let imageBinary = this.filedata.imageFileBinary; //image binary data response from api
        // let imageBase64String= btoa(imageBinary);
        // this.imageUrl = 'data:image/jpeg;base64,' + imageBase64String;

        //rename imageFileBinary to imageUrl

      }
    // })

  }


