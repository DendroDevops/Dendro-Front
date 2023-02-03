import {Pipe, PipeTransform} from '@angular/core';
import {Inventaire} from "../model/inventaire.interface";

@Pipe({
  name: 'filterEssence'
})
export class FilterEssencePipe implements PipeTransform {

  transform(value: any, nameEssence?: string): any {
    if (!value) return [];
    if (!nameEssence) return value;

    nameEssence = nameEssence.toLocaleLowerCase().trim();
    return value.filter((it: Inventaire) => {
      if (it.arbre) {
        return it.arbre.espece.genre.toLocaleLowerCase().includes(nameEssence);
      } else if (it.epaysage) {
        const tab = [];
        it.epaysage.essence.filter(essence => {
          if (essence.espece.genre.toLocaleLowerCase().includes(nameEssence)) tab.push(it)
        });
        return tab.length !== 0;
      }
    });
  }

}
