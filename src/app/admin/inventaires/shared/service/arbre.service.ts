import {Injectable} from '@angular/core';
import {ResourceService} from "../../../../shared/service/resource.service";
import {Arbre} from "../model/arbre.interface";
import {HttpClient} from "@angular/common/http";
import {ArbreSerializer} from "../serializer/arbre.serializer";

@Injectable()
export class ArbreService extends ResourceService<Arbre> {

  constructor(private http: HttpClient, private arbreSerializer: ArbreSerializer) {
    super(
      http,
      'arbre',
      arbreSerializer
    )
  }

}
