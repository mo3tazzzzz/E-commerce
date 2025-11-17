import { TestBed } from '@angular/core/testing';

import { CategorisService } from './categoris.service';

describe('CategorisService', () => {
  let service: CategorisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
