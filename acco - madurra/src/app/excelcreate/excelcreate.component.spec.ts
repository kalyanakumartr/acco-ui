import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelcreateComponent } from './excelcreate.component';

describe('ExcelcreateComponent', () => {
  let component: ExcelcreateComponent;
  let fixture: ComponentFixture<ExcelcreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExcelcreateComponent]
    });
    fixture = TestBed.createComponent(ExcelcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
