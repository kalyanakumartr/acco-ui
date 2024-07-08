import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacetovisitComponent } from './placetovisit.component';

describe('PlacetovisitComponent', () => {
  let component: PlacetovisitComponent;
  let fixture: ComponentFixture<PlacetovisitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlacetovisitComponent]
    });
    fixture = TestBed.createComponent(PlacetovisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
