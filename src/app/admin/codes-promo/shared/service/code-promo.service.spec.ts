import { TestBed } from '@angular/core/testing';

import { CodePromoService } from './code-promo.service';

describe('CodePromoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CodePromoService = TestBed.get(CodePromoService);
    expect(service).toBeTruthy();
  });
});
