import { Component } from '@angular/core';
import { TariffService } from 'src/app/services/tariff.service';

@Component({
  selector: 'app-tariff',
  templateUrl: './tariff.component.html',
  styleUrls: ['./tariff.component.scss']
})
export class TariffComponent {
  roleid: any;
  tariffData:any[]=[];

  constructor(private tariffservice:TariffService){}

  ngOnInit(): void {
    this.roleid = localStorage.getItem('roleid');
    console.log('roleid', this.roleid);
    this. gettariff();
  }

  gettariff(){
    this.tariffservice.gettariffamount()
    .subscribe((result)=>{
      console.log('tariff result', result);
      this.tariffData=result;
    })
  }
}
