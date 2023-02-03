import {inject, TestBed} from '@angular/core/testing';

import {CustomDateParserFormatterService} from './custom-date-parser-formatter.service';

describe('CustomDateParserFormatterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomDateParserFormatterService]
    });
  });

  it('should be created', inject([CustomDateParserFormatterService], (service: CustomDateParserFormatterService) => {
    expect(service).toBeTruthy();
  }));
});
