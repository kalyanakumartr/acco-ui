import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoebookingsummaryComponent } from './foebookingsummary.component';

describe('FoebookingsummaryComponent', () => {
  let component: FoebookingsummaryComponent;
  let fixture: ComponentFixture<FoebookingsummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoebookingsummaryComponent]
    });
    fixture = TestBed.createComponent(FoebookingsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
