import {getTestBed, TestBed} from '@angular/core/testing';

import {DroitService} from './droit.service';
import {DroitSerializer} from "../serializer/droit.serializer";
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {DroitModele} from "../model/droit";
import {environment} from "../../../../../environments/environment";

describe('DroitService', () => {

  let injector: TestBed;
  let service: DroitService;
  let httpMock: HttpTestingController;
  let droitSerializer: DroitSerializer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DroitService, DroitSerializer]
    });

    injector = getTestBed();
    service = injector.get(DroitService);
    httpMock = injector.get(HttpTestingController);
    droitSerializer = injector.get(DroitSerializer);
  });

  const data = [
    {
      "id": 1,
      "name": "ADMIN",
      "createdAt": "2019-05-27T11:19:29+00:00",
      "updatedAt": null
    },
    {
      "id": 2,
      "name": "LECTURE",
      "createdAt": "2019-05-27T11:19:29+00:00",
      "updatedAt": null
    },
    {
      "id": 3,
      "name": "LECTURE/ECRITURE",
      "createdAt": "2019-05-27T11:19:29+00:00",
      "updatedAt": null
    }
  ];

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should return list droits', (done: DoneFn) => {
    let convertData = data.map(elt => droitSerializer.fromJson(elt));
    // test list data
    service.list().subscribe((res: DroitModele[]) => {
      expect(res).toEqual(convertData);
    })

    const req = httpMock.expectOne((req) => req.url == `${environment.baseUrl}droit` && req.method == 'GET');
    expect(req.request.method).toEqual('GET');
    req.flush(convertData);
    done();
  });

  afterEach(() => {
    httpMock.verify();
  });
});
