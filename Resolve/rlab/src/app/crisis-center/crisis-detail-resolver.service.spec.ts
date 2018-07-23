import { TestBed, inject } from '@angular/core/testing';

import { CrisisDetailResolverService } from './crisis-detail-resolver.service';

describe('CrisisDetailResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrisisDetailResolverService]
    });
  });

  it('should be created', inject([CrisisDetailResolverService], (service: CrisisDetailResolverService) => {
    expect(service).toBeTruthy();
  }));
});
