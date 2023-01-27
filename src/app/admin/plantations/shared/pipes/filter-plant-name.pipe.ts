import {Pipe, PipeTransform} from '@angular/core';
import {Plantation} from "../model/plantation.interface";

@Pipe({
  name: 'filterPlantName'
})
export class FilterPlantNamePipe implements PipeTransform {

  transform(value: any, nameEspece?: string): any {
    if (!value) return [];
    if (!nameEspece) return value;

    nameEspece = nameEspece.toLocaleLowerCase().trim();
    return value.filter((it: Plantation) => {
      return it.espece.genre.toLocaleLowerCase().includes(nameEspece);
    });
  }

}
