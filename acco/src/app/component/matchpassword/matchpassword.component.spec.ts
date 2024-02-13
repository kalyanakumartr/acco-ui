import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchpasswordComponent } from './matchpassword.component';

describe('MatchpasswordComponent', () => {
  let component: MatchpasswordComponent;
  let fixture: ComponentFixture<MatchpasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatchpasswordComponent]
    });
    fixture = TestBed.createComponent(MatchpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
