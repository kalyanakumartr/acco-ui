import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateproofComponent } from './updateproof.component';

describe('UpdateproofComponent', () => {
  let component: UpdateproofComponent;
  let fixture: ComponentFixture<UpdateproofComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateproofComponent]
    });
    fixture = TestBed.createComponent(UpdateproofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
