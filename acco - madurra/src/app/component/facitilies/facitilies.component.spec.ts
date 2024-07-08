import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacitiliesComponent } from './facitilies.component';

describe('FacitiliesComponent', () => {
  let component: FacitiliesComponent;
  let fixture: ComponentFixture<FacitiliesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacitiliesComponent]
    });
    fixture = TestBed.createComponent(FacitiliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
