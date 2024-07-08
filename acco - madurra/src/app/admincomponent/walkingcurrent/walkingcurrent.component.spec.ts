import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkingcurrentComponent } from './walkingcurrent.component';

describe('WalkingcurrentComponent', () => {
  let component: WalkingcurrentComponent;
  let fixture: ComponentFixture<WalkingcurrentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WalkingcurrentComponent]
    });
    fixture = TestBed.createComponent(WalkingcurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
