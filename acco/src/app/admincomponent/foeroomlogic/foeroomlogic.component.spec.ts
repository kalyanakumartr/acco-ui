import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoeroomlogicComponent } from './foeroomlogic.component';

describe('FoeroomlogicComponent', () => {
  let component: FoeroomlogicComponent;
  let fixture: ComponentFixture<FoeroomlogicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoeroomlogicComponent]
    });
    fixture = TestBed.createComponent(FoeroomlogicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
