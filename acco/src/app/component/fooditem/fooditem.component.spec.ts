import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooditemComponent } from './fooditem.component';

describe('FooditemComponent', () => {
  let component: FooditemComponent;
  let fixture: ComponentFixture<FooditemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooditemComponent]
    });
    fixture = TestBed.createComponent(FooditemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
