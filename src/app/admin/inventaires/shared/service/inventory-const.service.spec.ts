import { TestBed, inject } from '@angular/core/testing';

import { InventoryConstService } from './inventory-const.service';

describe('InventoryConstService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InventoryConstService]
    });
  });

  it('should be created', inject([InventoryConstService], (service: InventoryConstService) => {
    expect(service).toBeTruthy();
  }));
});
