import {inject, TestBed} from '@angular/core/testing';

import {GestionTravauxService} from './gestion-travaux.service';

describe('GestionTravauxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GestionTravauxService]
    });
  });

  it('should be created', inject([GestionTravauxService], (service: GestionTravauxService) => {
    expect(service).toBeTruthy();
  }));
});
