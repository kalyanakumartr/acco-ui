import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittariffComponent } from './edittariff.component';

describe('EdittariffComponent', () => {
  let component: EdittariffComponent;
  let fixture: ComponentFixture<EdittariffComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EdittariffComponent]
    });
    fixture = TestBed.createComponent(EdittariffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
