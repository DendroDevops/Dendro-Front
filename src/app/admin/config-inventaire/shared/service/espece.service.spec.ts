import { TestBed, inject } from '@angular/core/testing';

import { EspeceService } from './espece.service';

describe('EspeceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EspeceService]
    });
  });

  it('should be created', inject([EspeceService], (service: EspeceService) => {
    expect(service).toBeTruthy();
  }));
});
