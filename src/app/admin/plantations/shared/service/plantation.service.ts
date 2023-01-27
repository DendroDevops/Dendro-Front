import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Plantation} from '../model/plantation.interface';
import {environment} from "../../../../../environments/environment";
import {ResourceService} from "../../../../shared/service/resource.service";
import {PlantationsSerializer} from "../serializer/plantations.serializer";
import {InventaireSerializer} from "../../../inventaires/shared/serializer/inventaire.serializer";

const headers = new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', 'Bearer ' + localStorage.getItem('token'))

@Injectable()
export class PlantationService extends ResourceService<Plantation> {

  constructor(
    private http: HttpClient,
    private plantSerializer: PlantationsSerializer
  ) {
    super(
      http,
      'plantations',
      plantSerializer
    )
  }

  deleteMany(idPlantations: Number[]) {
    return this.http.post(`${environment.baseUrl}${this.endpoint}/deleteMany`, {ids: idPlantations}, {headers: headers})
  }

  public static arrayListPlant(plantations: Plantation[]): any[] {
    const tab = [];
    plantations.map(elt => {
      tab.push({
        id: elt.id,
        type: 'Arbre',
        genre: elt.espece.genre,
        name: elt.espece.name,
        cultivar: elt.espece.cultivar,
        countSubject: elt.countSubject,
        hauteur: elt.hauteur,
        diametre: elt.diametre,
        address: elt.address,
        cp: InventaireSerializer.formatCpVille(elt.ville).cp,
        ville: InventaireSerializer.formatCpVille(elt.ville).ville,
        pays: elt.pays,
        dateEcheance: elt.dateEcheance,
        selected: false,
        inventory: elt.inventory
      })
    });
    return tab;
  }

}
