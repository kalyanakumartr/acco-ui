import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import { Role } from 'src/app/model/role.model';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-roll',
  templateUrl: './roll.component.html',
  styleUrls: ['./roll.component.scss'],
   })
export class RollComponent implements OnInit {
  role:Role[]=[];

  public displayedColumns =['roleid','rolename','shortname'];
  public dataSource=new MatTableDataSource<Role>();
  constructor (private roleService : RoleService){}

  ngOnInit(): void {
      this.getrole()
  }
  
  getrole(){
    this.roleService.getrole()
    .subscribe((res)=>{
      console.log(res);
      this.dataSource.data=res;
    });
      
    }
  }

