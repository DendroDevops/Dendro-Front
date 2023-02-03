import {Injectable} from '@angular/core';
import {DroitModele} from "../model/droit";
import {HttpClient} from "@angular/common/http";
import {ResourceService} from "../../../../shared/service/resource.service";
import {DroitSerializer} from "../serializer/droit.serializer";

@Injectable()
export class DroitService extends ResourceService<DroitModele> {

  constructor(private http: HttpClient, private droitSerializer: DroitSerializer) {
    super(
      http,
      'droit',
      droitSerializer
    )
  }
}
