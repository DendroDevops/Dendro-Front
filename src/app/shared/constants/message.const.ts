export const MESSAGE_INFOS: MessageInfos[] = [
  {
    "name": 'GROUPE',
    "details": {
      "delete": "Groupe supprimé avec l'ensemble de ses utilisateurs",
      "add": "Groupe enrégistré avec succès",
      "error": "Impossible d'enregistrer le groupe",
      "update": "Groupe mis à jour effectué avec succès"
    }
  },
  {
    "name": "DROIT",
    "details": {
      "add": "Groupe enrégistré avec succès",
      "error": "Impossible d'enregistrer le groupe",
      "delete": "",
      "update": ""
    }
  },
  {
    "name": "PROFIL",
    "details": {
      "delete": "Profil supprimé avec succès",
      "add": "Profil enrégistré avec succès",
      "error": "Impossible d'enregistrer le groupe",
      "update": "Mis à jour effectué avec succès"
    }
  }
]

export interface DetailMessageInfos {
  add?: string;
  delete?: string;
  error?: string;
  update?: string;
}

export interface MessageInfos {
  name: string;
  details: DetailMessageInfos
}
