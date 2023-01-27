import {inject, TestBed} from '@angular/core/testing';

import {CustomDateApaterService} from './custom-date-apater.service';

describe('CustomDateApaterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomDateApaterService]
    });
  });

  it('should be created', inject([CustomDateApaterService], (service: CustomDateApaterService) => {
    expect(service).toBeTruthy();
  }));
});
