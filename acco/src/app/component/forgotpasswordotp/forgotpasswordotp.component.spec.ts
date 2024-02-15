import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotpasswordotpComponent } from './forgotpasswordotp.component';

describe('ForgotpasswordotpComponent', () => {
  let component: ForgotpasswordotpComponent;
  let fixture: ComponentFixture<ForgotpasswordotpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotpasswordotpComponent]
    });
    fixture = TestBed.createComponent(ForgotpasswordotpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
