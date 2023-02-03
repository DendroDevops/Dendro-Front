import {inject, TestBed} from '@angular/core/testing';

import {EcheanceDateService} from './echeance-date.service';

describe('EcheanceDateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EcheanceDateService]
    });
  });

  it('should be created', inject([EcheanceDateService], (service: EcheanceDateService) => {
    expect(service).toBeTruthy();
  }));
});
