import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TariffComponent } from './tariff.component';

describe('TariffComponent', () => {
  let component: TariffComponent;
  let fixture: ComponentFixture<TariffComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TariffComponent]
    });
    fixture = TestBed.createComponent(TariffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
