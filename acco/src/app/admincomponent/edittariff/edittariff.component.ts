import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TariffService } from 'src/app/services/tariff.service';

@Component({
  selector: 'app-edittariff',
  templateUrl: './edittariff.component.html',
  styleUrls: ['./edittariff.component.scss']
})
export class EdittariffComponent {

  tariffForm!: FormGroup;
  tariffData: any[] = [];
  bhklist: any[] = [];
  personCount: any[] = [];
  selectedData: any = {};
  selectedPerson: any = '';



  constructor(private fb: FormBuilder, private tariffService: TariffService) { }

  ngOnInit(): void {

    this.gettariff();
    this.tariffForm = this.fb.group({
      bhk: ['', Validators.required],
      personcount: ['', Validators.required],
      dailytariff: [this.selectedData?.dailytariff || '', Validators.required],
      monthlytariff: [this.selectedData?.monthlytariff || '', Validators.required],
      title: ['', Validators.required,],
      description: ['', Validators.required,],
    });
    this.updateFormData();

  }

  gettariff() {
    this.tariffService.gettariffamount()
      .subscribe((result) => {
        console.log('tariff result', result);
        this.tariffData = result;
        this.bhklist = this.filterBhk();
        this.personCount = this.filterPersonCount();
        console.log('filtered', this.bhklist, this.personCount)


      })
  }

  filterBhk() {
    return [...new Set(this.tariffData.map(plan => plan.bhk))];
  }

  filterPersonCount() {
    return [...new Set(this.tariffData.map(plan => plan.personcount))];
  }

  updateFormData() {
    this.selectedPerson = this.tariffForm.get('personcount')?.value;;
    console.log('selected-----', this.selectedPerson);

    this.selectedData = this.tariffData.find(
      (data: any) => data.personcount === this.selectedPerson
    );
    console.log('selected data', this.selectedData);
    if (this.selectedData) {
      this.tariffForm.patchValue({
        dailytariff: this.selectedData.dailytariff,
        monthlytariff: this.selectedData.monthlytariff,
        title: this.selectedData.title,
        description: this.selectedData.description
      });
      console.log('selected data', this.selectedData);
 
    }
  }

  customizetariff() {
    console.log(this.tariffForm.value);
    const formvalue = this.tariffForm.value;
    this.tariffService.updateTariff(formvalue)
      .subscribe((result) => {
        console.log(result);
      })
  }

}
