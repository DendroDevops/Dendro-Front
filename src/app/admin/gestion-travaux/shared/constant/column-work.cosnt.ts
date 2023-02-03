import {ColumnInterface} from "../../../../custom-table/shared/modele/column.interface";

export const COLUMNS_WORK_CONST: ColumnInterface[] = [
  {name: 'check', isCheck: true, style: '', isModelProperty: false, isVisible: true},
  {name: 'type', display: 'Type', style: 'min-width: 8rem', isModelProperty: true, isVisible: true},
  {name: 'genre', display: 'Genre', style: 'min-width: 8rem', isModelProperty: true, isVisible: true},
  {name: 'espece', display: 'Espèce', style: 'min-width: 8rem', isModelProperty: true, isVisible: true},
  {name: 'cultivar', display: 'Cultivar', style: 'min-width: 8rem', isModelProperty: true, isVisible: true},
  {
    name: 'Travaux à réaliser',
    style: 'min-width: 8rem',
    display: 'Détail des travaux',
    isLink: true,
    isModelProperty: false,
    isVisible: true
  },
  {
    name: 'userEditedDateTravaux',
    display: 'Date échéance',
    isDate: true,
    isSort: true,
    isModelProperty: true,
    isVisible: true
  },
  {name: 'countSubject', display: 'Nbre de Sujets', style: 'min-width: 8rem', isModelProperty: true, isVisible: true},
  {name: 'hauteur', display: 'Hauteur', style: 'min-width: 5rem', isModelProperty: true, isVisible: true},
  {name: 'diametre', display: 'Diamètre', style: 'min-width: 5rem', isModelProperty: true, isVisible: true},
  {name: 'address', display: 'Adresse', style: 'min-width: 16rem', isModelProperty: true, isVisible: true},
  {name: 'ville', display: 'ville', style: 'min-width: 14rem', isModelProperty: true, isVisible: true},
  {name: 'codeSite', display: 'Code Site', style: 'min-width: 2.5rem', isModelProperty: true, isVisible: true},
  {name: 'numSujet', display: 'Identification', style: 'min-width: 2.5rem', isModelProperty: true, isVisible: true},
  {name: 'beva', display: 'Valeur BEVA', style: 'min-width:5rem', isModelProperty: true, isVisible: true},
  {name: 'comment', display: 'Commentaires', style: 'min-width:5rem', isModelProperty: true, isVisible: true},
  {
    name: 'username',
    display: 'Recenseur',
    style: 'min-width: 0.5rem',
    isModelProperty: true,
    isVisible: true
  },
  {name: 'actions', style: '', isModelProperty: false, isVisible: true}
];
