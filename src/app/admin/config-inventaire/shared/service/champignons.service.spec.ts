import { TestBed, inject } from '@angular/core/testing';

import { ChampignonsService } from './champignons.service';

describe('ChampignonsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChampignonsService]
    });
  });

  it('should be created', inject([ChampignonsService], (service: ChampignonsService) => {
    expect(service).toBeTruthy();
  }));
});
