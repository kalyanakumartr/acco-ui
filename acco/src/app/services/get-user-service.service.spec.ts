import { TestBed } from '@angular/core/testing';

import { GetUserServiceService } from './get-user-service.service';

describe('GetUserServiceService', () => {
  let service: GetUserServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetUserServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
