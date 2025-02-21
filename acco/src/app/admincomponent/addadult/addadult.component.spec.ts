import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddadultComponent } from './addadult.component';

describe('AddadultComponent', () => {
  let component: AddadultComponent;
  let fixture: ComponentFixture<AddadultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddadultComponent]
    });
    fixture = TestBed.createComponent(AddadultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
