import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EssenceService} from "../../shared/service/essence.service";
import {Essence} from "../../shared/model/essence.interface";

import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-detail-essence',
  templateUrl: './detail-essence.component.html',
  styleUrls: ['./detail-essence.component.scss']
})
export class DetailEssenceComponent implements OnInit {

  visibleSpinner = false;
  essence: Essence;
  urlBaseEssence = environment.baseUrl + 'images/epaysage/essences/';
  urlBackPage: string;
  current = new Date().getTime();

  constructor(
    private activatedRoute: ActivatedRoute,
    private essenceService: EssenceService,
  ) {
  }

  ngOnInit() {
    this.getOneEssence();
  }

  getOneEssence() {
    this.visibleSpinner = true;
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.urlBackPage = this.activatedRoute.snapshot.paramMap.get('urlBackPage');

    this.essenceService.read(parseInt(id))
      .toPromise()
      .then((data: Essence) => {
        this.essence = {...data, varietyGrade: String(data.varietyGrade).replace(".", ",")};
      })
      .catch(() => {
      })
  }

}
