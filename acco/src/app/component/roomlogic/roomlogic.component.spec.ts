import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomlogicComponent } from './roomlogic.component';

describe('RoomlogicComponent', () => {
  let component: RoomlogicComponent;
  let fixture: ComponentFixture<RoomlogicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomlogicComponent]
    });
    fixture = TestBed.createComponent(RoomlogicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
