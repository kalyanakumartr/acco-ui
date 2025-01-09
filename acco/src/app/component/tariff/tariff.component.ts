import { Component } from '@angular/core';

@Component({
  selector: 'app-tariff',
  templateUrl: './tariff.component.html',
  styleUrls: ['./tariff.component.scss']
})
export class TariffComponent {
  roleid: any

  ngOnInit(): void {
    this.roleid = localStorage.getItem('roleid');
    console.log('roleid', this.roleid);

  }
}
