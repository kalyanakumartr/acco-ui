import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditflatComponent } from './editflat.component';

describe('EditflatComponent', () => {
  let component: EditflatComponent;
  let fixture: ComponentFixture<EditflatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditflatComponent]
    });
    fixture = TestBed.createComponent(EditflatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
