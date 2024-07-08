import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontdeskselectroomsComponent } from './frontdeskselectrooms.component';

describe('FrontdeskselectroomsComponent', () => {
  let component: FrontdeskselectroomsComponent;
  let fixture: ComponentFixture<FrontdeskselectroomsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FrontdeskselectroomsComponent]
    });
    fixture = TestBed.createComponent(FrontdeskselectroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
