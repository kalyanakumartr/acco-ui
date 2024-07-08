import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotpasswordformComponent } from './forgotpasswordform.component';

describe('ForgotpasswordformComponent', () => {
  let component: ForgotpasswordformComponent;
  let fixture: ComponentFixture<ForgotpasswordformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotpasswordformComponent]
    });
    fixture = TestBed.createComponent(ForgotpasswordformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
