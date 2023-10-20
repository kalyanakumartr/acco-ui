import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollComponent } from './roll.component';

describe('RollComponent', () => {
  let component: RollComponent;
  let fixture: ComponentFixture<RollComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RollComponent]
    });
    fixture = TestBed.createComponent(RollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
