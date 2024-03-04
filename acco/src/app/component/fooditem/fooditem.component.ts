import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from "@angular/material/table";
import {MatProgressSpinnerModule, ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { fooditem } from 'src/app/model/fooditem.model';
import { FooditemService } from 'src/app/services/fooditem.service';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-fooditem',
  templateUrl: './fooditem.component.html',
  styleUrls: ['./fooditem.component.scss'],
  
  
})
export class FooditemComponent implements OnInit{
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50
  food:any;
 
  role:fooditem[]=[];
    public displayedColumns =['fooditemid','fooditem','foodcategory','avilabletime','price','status'];
    public dataSource=new MatTableDataSource<fooditem>();
    constructor (private fooditemService:FooditemService
      ){
        console.log("display",this.displayedColumns);
        console.log("datasource",this.dataSource); 
      }
    
      @ViewChild('paginator')
      paginator!: MatPaginator;
          
      ngAfterViewInit(){
        this.dataSource.paginator=this.paginator;

      }
  ngOnInit(): void {  
        this.showfooditem()
}
showfooditem(){
    this.fooditemService.getfooditem()
  // .subscribe((res)=>{
    .subscribe((res)=>{
    console.log(res);   
    this.food=res; 
    console.log("res",this.food);    
    this.dataSource.data=res;    
    console.log("datasource1",this.dataSource.data); 
  });
  
    
  }
}
