import { Component,OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Placetovisit } from 'src/app/model/placttovisit.model';
import { PlacetovisitService } from 'src/app/services/placetovisit.service';

@Component({
  selector: 'app-placetovisit',
  templateUrl: './placetovisit.component.html',
  styleUrls: ['./placetovisit.component.scss'],
})
export class PlacetovisitComponent implements OnInit{
  placetovisit:Placetovisit[] = [];
  public displayedColumns = ['placeid','location','distancefromhotel','description','status'];
  public dataSource = new MatTableDataSource<Placetovisit>();
  constructor(private placetovisitService: PlacetovisitService) {
    console.log("display",this.displayedColumns);
    console.log("datasource",this.dataSource); 
  }
  @ViewChild('paginator')
  paginator!: MatPaginator;

  PageSizes = [3, 5, 7];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.placeshow();
  }
  
  
  placeshow() {
    this.placetovisitService.getplace()
    .subscribe((res)=>{
      this.dataSource.data=res;
      console.log("datasource",this.dataSource.data); 
    });
  }
}
