import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomercancelComponent } from './customercancel.component';

describe('CustomercancelComponent', () => {
  let component: CustomercancelComponent;
  let fixture: ComponentFixture<CustomercancelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomercancelComponent]
    });
    fixture = TestBed.createComponent(CustomercancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
