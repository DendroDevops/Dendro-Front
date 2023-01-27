import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NuisibleSerializer} from "../serializer/nuisible.serializer";
import {ResourceService} from "../../../../shared/service/resource.service";
import {Nuisible} from "../model/nuisible.interface";

@Injectable()
export class NuisibleService extends ResourceService<Nuisible> {

  constructor(private http: HttpClient, private nuisibleSerializer: NuisibleSerializer) {
    super(
      http,
      'nuisible',
      nuisibleSerializer
    )
  }
}
