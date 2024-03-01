import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomfromwalkinfutureComponent } from './roomfromwalkinfuture.component';

describe('RoomfromwalkinfutureComponent', () => {
  let component: RoomfromwalkinfutureComponent;
  let fixture: ComponentFixture<RoomfromwalkinfutureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomfromwalkinfutureComponent]
    });
    fixture = TestBed.createComponent(RoomfromwalkinfutureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
