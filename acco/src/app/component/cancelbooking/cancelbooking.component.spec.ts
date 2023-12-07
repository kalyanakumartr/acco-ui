import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelbookingComponent } from './cancelbooking.component';

describe('CancelbookingComponent', () => {
  let component: CancelbookingComponent;
  let fixture: ComponentFixture<CancelbookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CancelbookingComponent]
    });
    fixture = TestBed.createComponent(CancelbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
