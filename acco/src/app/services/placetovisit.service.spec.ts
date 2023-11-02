import { TestBed } from '@angular/core/testing';

import { PlacetovisitService } from './placetovisit.service';

describe('PlacetovisitService', () => {
  let service: PlacetovisitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlacetovisitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
