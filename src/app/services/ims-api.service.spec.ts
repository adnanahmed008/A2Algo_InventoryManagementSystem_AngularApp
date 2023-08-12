import { TestBed } from '@angular/core/testing';

import { ImsApiService } from './ims-api.service';

describe('ImsApiService', () => {
  let service: ImsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
