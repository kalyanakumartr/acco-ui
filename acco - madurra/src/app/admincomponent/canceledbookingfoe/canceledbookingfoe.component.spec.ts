import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanceledbookingfoeComponent } from './canceledbookingfoe.component';

describe('CanceledbookingfoeComponent', () => {
  let component: CanceledbookingfoeComponent;
  let fixture: ComponentFixture<CanceledbookingfoeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CanceledbookingfoeComponent]
    });
    fixture = TestBed.createComponent(CanceledbookingfoeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
