import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraiffComponent } from './traiff.component';

describe('TraiffComponent', () => {
  let component: TraiffComponent;
  let fixture: ComponentFixture<TraiffComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TraiffComponent]
    });
    fixture = TestBed.createComponent(TraiffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
