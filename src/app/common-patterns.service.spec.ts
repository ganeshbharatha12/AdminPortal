import { TestBed } from '@angular/core/testing';

import { CommonPatternsService } from './common-patterns.service';

describe('CommonPatternsService', () => {
  let service: CommonPatternsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonPatternsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
