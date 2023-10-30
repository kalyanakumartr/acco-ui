import { Component, OnInit } from '@angular/core';
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
    ngOnInit(): void {
        this.getrole()
    }
      getrole(){
      this.roleService.getrole()
      // .subscribe((res)=>{
        .subscribe((res)=>{
        console.log(res);
        this.dataSource.data=res;
        console.log("datasource1",this.dataSource.data); 
      });
        
      }
    }
  
