import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoecheckouttimeComponent } from './foecheckouttime.component';

describe('FoecheckouttimeComponent', () => {
  let component: FoecheckouttimeComponent;
  let fixture: ComponentFixture<FoecheckouttimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoecheckouttimeComponent]
    });
    fixture = TestBed.createComponent(FoecheckouttimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
