import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomtypeComponent } from './roomtype.component';

describe('RoomtypeComponent', () => {
  let component: RoomtypeComponent;
  let fixture: ComponentFixture<RoomtypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomtypeComponent]
    });
    fixture = TestBed.createComponent(RoomtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
