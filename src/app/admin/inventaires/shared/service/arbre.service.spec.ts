import {inject, TestBed} from '@angular/core/testing';

import {ArbreService} from './arbre.service';

describe('ArbreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArbreService]
    });
  });

  it('should be created', inject([ArbreService], (service: ArbreService) => {
    expect(service).toBeTruthy();
  }));
});
