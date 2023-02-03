export interface Travaux {
  id: number;
  arbreId?: number;
  essenceId?: number;
  epaysageId?: number;
  inventaireId?: number;
  type?: string;

  // ARBRE
  abattage?: string;
  travauxColletMultiple?: string[];
  travauxTroncMultiple?: string[];
  travauxHouppierMultiple?: string[];
  travauxCommentaire?: string;
  travauxHouppierOther?: string;
  travauxColletOther?: string;
  travauxTroncOther?: string;
  travauxTroncProtection?: string;

  // ESSENCE
  travaux: string[];
  travauxOther?: string;
  travauxSoin?: string;
  travauxProtection?: string;
  nbreSujetConcerne?: number
  // END ESSENCE

  statusTravaux?: boolean;
  dateTravaux?: string;
  dateProVisite?: string;
  userEditedDateTravaux?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}


