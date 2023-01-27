import { DetailWorkComponent } from "../../../../custom-table/components/detail-work/detail-work.component";
import {ColumnInterface} from "../../../../custom-table/shared/modele/column.interface";

export const COLUMNS_WORK_CONST: ColumnInterface[] = [
  {name: 'check', isCheck: true, style: {}, isModelProperty: false, isVisible: true},
  {name: 'type', display: 'Type', style: {"min-width": "8rem"}, isModelProperty: true, isVisible: true, isSort: true, isString: true},
  {name: 'genre', display: 'Genre', style: {"min-width": "8rem"}, isModelProperty: true, isVisible: true, isSort: true, isString: true},
  {name: 'espece', display: 'Espèce', style: {"min-width": "8rem"}, isModelProperty: true, isVisible: true, isSort: true, isString: true},
  {name: 'cultivar', display: 'Cultivar', style: {"min-width": "8rem"}, isModelProperty: true, isVisible: true, isSort: true, isString: true},
  {
    name: 'Travaux à réaliser',
    style: {"min-width": "8rem"},
    display: 'Détail des travaux',
    isModalLink: true,
    modalComponent: DetailWorkComponent,
    modalTitle: "TRAVAUX",
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
  {name: 'countSubject', display: 'Nbre de Sujets', style: {"min-width": "8rem"}, isModelProperty: true, isVisible: true, isSort: true, isNumber: true},
  {name: 'hauteur', display: 'Hauteur', style: {"min-width": "5rem"}, isModelProperty: true, isVisible: true, isSort: true, isNumber: true},
  {name: 'diametre', display: 'Diamètre', style: {"min-width": "5rem"}, isModelProperty: true, isVisible: true, isSort: true, isNumber: true},
  {name: 'address', display: 'Adresse', style: {"min-width": "16rem"}, isModelProperty: true, isVisible: true, isSort: true, isString: true},
  {name: 'ville', display: 'Ville', style: {"min-width": "14rem"}, isModelProperty: true, isVisible: true, isSort: true, isString: true},
  {name: 'pays', display: 'Pays', style: {"min-width": "2rem"}, isModelProperty: true, isVisible: true, isSort: true, isString: true},
  {name: 'codeSite', display: 'Code Site', style: {"min-width": "2.5rem"}, isModelProperty: true, isVisible: true, isSort: true, isString: true},
  {name: 'numSujet', display: 'Identification', style: {"min-width": "2.5rem"}, isModelProperty: true, isVisible: true, isSort: true, isString: true},
  {name: 'beva', display: 'Valeur BEVA', style: {"min-width": "5rem"}, isModelProperty: true, isVisible: true, isSort: true, isNumber: true},
  {name: 'comment', display: 'Commentaires', style: {"min-width": "5rem"}, isModelProperty: true, isVisible: true, isSort: true, isString: true},
  {
    name: 'username',
    display: 'Recenseur',
    style: {"min-width": "0.5rem"},
    isModelProperty: true,
    isVisible: true,
    isSort: true,
    isString: true
  },
  {name: 'actions', style: '', isModelProperty: false, isVisible: true}
];
