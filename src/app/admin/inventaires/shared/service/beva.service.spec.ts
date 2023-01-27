import { TestBed, inject } from '@angular/core/testing';

import { BevaService } from './beva.service';

describe('BevaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BevaService]
    });
  });

  it('should be created', inject([BevaService], (service: BevaService) => {
    expect(service).toBeTruthy();
  }));
});
