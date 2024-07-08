import { Component } from '@angular/core';

@Component({
  selector: 'app-excelcreate',
  templateUrl: './excelcreate.component.html',
  styleUrls: ['./excelcreate.component.scss']
})
export class ExcelcreateComponent {


  array:any = [];

 content:any = [
   {
     id: 1,
     name: "a"
   },
   {
    id: 2,
    name: "b"
  }
 ];

file() {
  for(let i=0; i<this.content.length; i++){
    var o;
    var newArray:any = [];
    for (o in this.content[i]) {
      newArray.push(o);
    }
    break;
  }
  this.array.push(newArray);
  for(let i=0; i<this.content.length; i++){
    this.array.push(Object.values(this.content[i]));
  }
  console.log(this.array);
  var CsvString = "";
  this.array.forEach((RowItem:any, RowIndex:any)=> {
    RowItem.forEach((ColItem:any, ColIndex:any)=> {
      CsvString += ColItem + ',';
    });
    CsvString += "\r\n";
  });
 CsvString = "data:application/csv," + encodeURIComponent(CsvString);
 var x = document.createElement("A");
 x.setAttribute("href", CsvString );
 x.setAttribute("download","somedata.csv");
 document.body.appendChild(x);
 x.click();
}

}
