import {Pipe, PipeTransform} from '@angular/core';
import {Inventaire} from "../model/inventaire.interface";

@Pipe({
  name: 'filterAddress'
})
export class FilterAddressPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase().trim();

    return items.filter((it: Inventaire) => {
      if (it.arbre) {
        return it.arbre.address.toLocaleLowerCase().includes(searchText);
      } else if (it.epaysage) {
        return it.epaysage.address.toLocaleLowerCase().includes(searchText);
      }
    });
  }
}
