import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkingfutureComponent } from './walkingfuture.component';

describe('WalkingfutureComponent', () => {
  let component: WalkingfutureComponent;
  let fixture: ComponentFixture<WalkingfutureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WalkingfutureComponent]
    });
    fixture = TestBed.createComponent(WalkingfutureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
