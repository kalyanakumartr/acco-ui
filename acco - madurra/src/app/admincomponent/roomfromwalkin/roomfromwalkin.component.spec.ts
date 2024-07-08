import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomfromwalkinComponent } from './roomfromwalkin.component';

describe('RoomfromwalkinComponent', () => {
  let component: RoomfromwalkinComponent;
  let fixture: ComponentFixture<RoomfromwalkinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomfromwalkinComponent]
    });
    fixture = TestBed.createComponent(RoomfromwalkinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
