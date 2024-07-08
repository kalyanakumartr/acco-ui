import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsummaryComponent } from './bookingsummary.component';

describe('BookingsummaryComponent', () => {
  let component: BookingsummaryComponent;
  let fixture: ComponentFixture<BookingsummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingsummaryComponent]
    });
    fixture = TestBed.createComponent(BookingsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
