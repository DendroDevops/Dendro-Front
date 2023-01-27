import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EspeceSerializer} from "../serializer/espece.serializer";
import {ResourceService} from "../../../../shared/service/resource.service";
import {Espece} from "../model/espece.interface";

@Injectable()
export class EspeceService extends ResourceService<Espece> {

  constructor(private http: HttpClient, private especeSerializer: EspeceSerializer) {
    super(
      http,
      'especes',
      especeSerializer
    )
  }
}
