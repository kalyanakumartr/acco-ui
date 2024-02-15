import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotpasswordstepperComponent } from './forgotpasswordstepper.component';

describe('ForgotpasswordstepperComponent', () => {
  let component: ForgotpasswordstepperComponent;
  let fixture: ComponentFixture<ForgotpasswordstepperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotpasswordstepperComponent]
    });
    fixture = TestBed.createComponent(ForgotpasswordstepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
