import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from "@angular/material/table";
import { Role } from 'src/app/model/role.model';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],

   })

  export class RoleComponent implements OnInit {
    
    role:Role[]=[];
    public displayedColumns =['roleid','rolename','shortname','status'];
    public dataSource=new MatTableDataSource<Role>();
    constructor (private roleService:RoleService
      ){
        console.log("display",this.displayedColumns);
        console.log("datasource",this.dataSource); 
      }
      
      @ViewChild('paginator')
  paginator!: MatPaginator;
      

      PageSizes=[3,5,7];
      


      ngAfterViewInit(){
        this.dataSource.paginator=this.paginator;

      }
    ngOnInit(): void {
        this.showrole()
    }
      showrole(){
      this.roleService.getrole()
      // .subscribe((res)=>{
        .subscribe((res)=>{
        console.log(res);
        this.dataSource.data=res;
        console.log("datasource1",this.dataSource.data); 
      });
        
      }
    }
  
