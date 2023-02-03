import { TestBed, inject } from '@angular/core/testing';

import { NuisibleService } from './nuisible.service';

describe('NuisibleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NuisibleService]
    });
  });

  it('should be created', inject([NuisibleService], (service: NuisibleService) => {
    expect(service).toBeTruthy();
  }));
});
