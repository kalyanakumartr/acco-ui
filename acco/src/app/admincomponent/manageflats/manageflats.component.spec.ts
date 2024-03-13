import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageflatsComponent } from './manageflats.component';

describe('ManageflatsComponent', () => {
  let component: ManageflatsComponent;
  let fixture: ComponentFixture<ManageflatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageflatsComponent]
    });
    fixture = TestBed.createComponent(ManageflatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
