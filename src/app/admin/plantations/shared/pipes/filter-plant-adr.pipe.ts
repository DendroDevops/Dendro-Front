import {Pipe, PipeTransform} from '@angular/core';
import {Plantation} from "../model/plantation.interface";

@Pipe({
  name: 'filterPlantAdr'
})
export class FilterPlantAdrPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase().trim();

    return items.filter((it: Plantation) => {
      return it.address.toLocaleLowerCase().includes(searchText);
    });
  }

}
