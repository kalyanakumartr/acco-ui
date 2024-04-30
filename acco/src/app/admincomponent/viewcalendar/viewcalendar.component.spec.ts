import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcalendarComponent } from './viewcalendar.component';

describe('ViewcalendarComponent', () => {
  let component: ViewcalendarComponent;
  let fixture: ComponentFixture<ViewcalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewcalendarComponent]
    });
    fixture = TestBed.createComponent(ViewcalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
