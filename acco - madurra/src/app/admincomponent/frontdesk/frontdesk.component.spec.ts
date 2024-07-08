import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontdeskComponent } from './frontdesk.component';

describe('FrontdeskComponent', () => {
  let component: FrontdeskComponent;
  let fixture: ComponentFixture<FrontdeskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FrontdeskComponent]
    });
    fixture = TestBed.createComponent(FrontdeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
