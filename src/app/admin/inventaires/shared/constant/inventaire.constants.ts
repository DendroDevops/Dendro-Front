export interface DataConst {
  name: string;
  displayName: string;
}

export const DOMAINE_TAB = [
  {name: 'espace-bublic', displayName: 'Espace public'},
  {name: 'propriete-privee', displayName: 'Propriété privée'}
];
export const IMPLANTATION_TAB = [
  {
    name: 'isole',
    displayName: 'Isolé'
  },
  {
    name: 'en-groupe',
    displayName: 'En groupe'
  },
  {
    name: 'en-alignement',
    displayName: 'En alignement'
  }
];
export const CRITERE_TAB = [
  {
    name: 'aucun',
    displayName: 'Aucun'
  },
  {
    name: 'valeur-historique',
    displayName: 'Valeur historique'
  },
  {
    name: 'port-hors-norme',
    displayName: 'Port hors-norme'
  },
  {
    name: 'taille-hors-norme',
    displayName: 'Taille hors-norme'
  },
  {
    name: 'essence-rare',
    displayName: 'Essence rare'
  },
  {
    name: "autre-precisez",
    displayName: "Autre, précisez : "
  }
];

export const PROXIMITE_TAB = [
  {
    name: "neant",
    displayName: "Néant"
  },
  {
    name: "btiment-immeuble",
    displayName: "Bâtiment, immeuble"
  },
  {
    name: "maison-individuelle",
    displayName: "Maison individuelle"
  },
  {
    name: "muret-clture-sparation",
    displayName: "Muret, clôture, séparation"
  },
  {
    name: "chemin-voie-prive",
    displayName: "Chemin, voie privée"
  },
  {
    name: "voie-de-circulation",
    displayName: "Voie de circulation"
  },
  {
    name: "parking-garage-box",
    displayName: "Parking, garage, box"
  },
  {
    name: "ecole-btiment-public",
    displayName: "Ecole, bâtiment public"
  },
  {
    name: "eclairage-public",
    displayName: "Eclairage public"
  },
  {
    name: "rseau-lectrique-gain",
    displayName: "Réseau électrique gainé"
  },
  {
    name: "rseau-lectrique-non-gain",
    displayName: "Réseau électrique non gainé"
  },
  {
    name: "rseau-souterrain",
    displayName: "Réseau souterrain"
  },
  {
    name: "zone-en-chantier",
    displayName: "Zone en chantier"
  },
  {
    name: "other",
    displayName: "Autre, précisez :"
  }
];

export const PROXIMITE_WITH_DICT_TAB: DataConst [] = [
  {
    name: "eclairage-public",
    displayName: "Eclairage public"
  },
  {
    name: "rseau-lectrique-gain",
    displayName: "Réseau électrique gainé"
  },
  {
    name: "rseau-lectrique-non-gain",
    displayName: "Réseau électrique non gainé"
  },
  {
    name: "rseau-souterrain",
    displayName: "Réseau souterrain"
  },
];

export const CARACT_PIED_TAB = [
  {
    name: "terre-litiere",
    displayName: "Terre, litière"
  },
  {
    name: "vegetalisation",
    displayName: "Végétalisation"
  },
  {
    name: "protection",
    displayName: "Protection"
  },
  {
    name: "enrobe",
    displayName: "Enrobé"
  },
  {
    name: "materiau-drainant",
    displayName: "Matériau drainant"
  },
  {
    name: "other",
    displayName: "Autre, précisez :"
  }
];
export const CARACT_TRONC_TAB = [
  {
    name: "tronc-unique",
    displayName: "Tronc unique"
  },
  {
    name: "tronc-multiples",
    displayName: "Tronc multiples"
  }
];

export const PORT_ARBRE_TAB = [
  {
    name: "port-libre",
    displayName: "Port libre"
  },
  {
    name: "semi-libre",
    displayName: "Semi-libre"
  },
  {
    name: "tete-de-chat",
    displayName: "Tête de chat"
  },
  {
    name: "en-trogne",
    displayName: "En trogne"
  },
  {
    name: "rideau-marquise",
    displayName: "Rideau marquise"
  },
  {
    name: "taille-travaillée",
    displayName: "Taille travaillée"
  }

];

export const STADE_DEV_TAB = [
  {
    name: "jeune",
    displayName: "Juvénile"
  },
  {
    name: "adulte",
    displayName: "Adulte"
  },
  {
    name: "veillissant",
    displayName: "Mature"
  },
  {
    name: "senescent",
    displayName: "Vieillissant"
  }
];

export const ETAT_SAN_COLLET_TAB = [
  {
    name: "aucun-dfaut-apparent",
    displayName: "Aucun défaut apparent"
  },
  {
    name: "blessure-ncrose",
    displayName: "Blessure, nécrose"
  },
  {
    name: "rejets-rsurgences-racinaires",
    displayName: "Rejets, résurgences racinaires"
  },
  {
    name: "soulvement-dcollement",
    displayName: "Soulèvement, décollement"
  },
  {
    name: "cavit-nombre",
    displayName: "Cavité, nombre :"
  },
  {
    name: "champignons-lignivores",
    displayName: "Champignons lignivores, précisez :",
  },
  {
    name: "other",
    displayName: "Autre, précisez :"
  }
];

export const ETAT_SAN_TRONC_TAB = [
  {
    name: "aucun-dfaut-apparent",
    displayName: "Aucun défaut apparent"
  },
  {
    name: "rejets",
    displayName: "Rejets"
  },
  {
    name: "inclinaison",
    displayName: "Inclinaison"
  },
  {
    name: "blessure-necrose",
    displayName: "Blessure, nécrose"
  },
  {
    name: "fissuration-ecorce-incluse",
    displayName: "Écorce incluse"
  },
  {
    name: "renflement",
    displayName: "Renflement"
  },
  {
    name: "echaudure",
    displayName: "Echaudure"
  },
  {
    name: "coulure-de-resine-gomme",
    displayName: "Coulure de résine, gomme"
  },
  {
    name: "cavit-nombre",
    displayName: "Cavité, nombre :"
  },
  {
    name: "corps-etranger",
    displayName: "Corps étranger, précisez :",
  },
  {
    name: "champignons-lignivores",
    displayName: "Champignons lignivores, précisez :",
  },
  {
    name: "parasite",
    displayName: "Parasites, nuisibles :"
  },
  {
    name: "other",
    displayName: "Autre, précisez :"
  }
];
export const ETAT_SAN_HOUPPIER_TAB = [
  {
    name: "aucun-dfaut-apparent",
    displayName: "Aucun défaut apparent"
  },
  {
    name: "rejets",
    displayName: "Rejets"
  },
  {
    name: "blessure-necrose",
    displayName: "Blessure, nécrose"
  },
  {
    name: "echaudure",
    displayName: "Echaudure"
  },
  {
    name: "branche-a-risque",
    displayName: "Branches à risque"
  },
  {
    name: "bois-mort",
    displayName: "Bois mort"
  },
  {
    name: "fissuration-ecorce-incluse",
    displayName: "Écorce incluse"
  },
  {
    name: "descente-de-cime",
    displayName: "Descente de cime"
  },
  {
    name: "champignons-lignivores",
    displayName: "Champignons lignivores, précisez :",
  },
  {
    name: "parasite",
    displayName: "Parasites, nuisibles :"
  },
  {
    name: "other",
    displayName: "Autre, précisez :"
  }
];

export const ETAT_SAN_GENERAL_TAB = [
  {
    name: "vigoureux",
    displayName: "Vigoureux"
  },
  {
    name: "vigueur-moyenne",
    displayName: "Vigueur moyenne"
  },
  {
    name: "peu-vigoureux",
    displayName: "Peu vigoureux"
  },
  {
    name: "regressif",
    displayName: "Régressif"
  },
  {
    name: "mort",
    displayName: "Mort"
  },
  {
    name: "exam-comple",
    displayName: "Examen complémentaire requis"
  },
  {
    name: "other",
    displayName: "Commentaire :"
  }
];

export const RISQUE_TAB = [
  {
    name: "faible",
    displayName: "Faible"
  },
  {
    name: "modere",
    displayName: "Modéré"
  },
  {
    name: "eleve",
    displayName: "Elevé"
  },
  {
    name: "imminent",
    displayName: "Imminent"
  }
];

export const RISQUE_GENERAL_TAB = [
  {
    name: "faible",
    displayName: "Faible"
  },
  {
    name: "modere",
    displayName: "Modéré"
  },
  {
    name: "eleve",
    displayName: "Elevé"
  },
  {
    name: "imminent",
    displayName: "Imminent"
  },
  {
    name: "other",
    displayName: "Commentaire :"
  }
];

export const NUISANCE_TAB = [
  {
    name: "neant",
    displayName: "Néant"
  },
  {
    name: "perte-de-luminosit",
    displayName: "Perte de luminosité"
  },
  {
    name: "fructification-ou-feuillage",
    displayName: "Fructification ou feuillage"
  },
  {
    name: "branches-retombantes-sur-les-voies",
    displayName: "Branches retombantes sur les voies"
  },
  {
    name: "branches-dans-les-amnagements",
    displayName: "Branches dans les aménagements"
  },
  {
    name: "branches-dans-les-rseaux-ariens",
    displayName: "Branches dans les réseaux aériens"
  },
  {
    name: "pousse-racinaire-sur-les-amnagements",
    displayName: "Poussée racinaire sur les aménagements"
  },
  {
    name: "systme-racinaire-dans-les-rseaux",
    displayName: "Système racinaire dans les réseaux"
  },
  {
    name: "dgradation-de-faade-toiture",
    displayName: "Dégradation de façade, toiture"
  }
];

export const TAUX_FREQ_TAB = [
  {
    name: "moins-d-une-pers-par-semaine",
    displayName: "Moins d'1 pers / semaine"
  },
  {
    name: "moins-de-douze-personnes-par-jour",
    displayName: "Moins de 12 pers / jour"
  },
  {
    name: "moins-dune-personne-par-heure",
    displayName: "Moins d'1 pers / heure"
  },
  {
    name: "moins-de-dix-personnes-par-heure",
    displayName: "Moins de 10 pers / heure"
  },
  {
    name: "moins-de-trente-six-personnes-par-heure",
    displayName: "Moins de 36 pers / heure"
  },
  {
    name: "passage-constant",
    displayName: "Passage constant"
  }
];

export const TYPE_PASSAGE_TAB = [
  {
    name: "pietons",
    displayName: "Piétons"
  },
  {
    name: "vehicules",
    displayName: "Véhicules"
  },
  {
    name: "velo-rollers",
    displayName: "Vélo, rollers, déplacements doux"
  },
  {
    name: "other",
    displayName: "Autre, précisez :"
  }
];

export const ACCESSIBILITE_TAB = [
  {
    name: "accs-facile-voie-route-chemin",
    displayName: "Accès facile (voie, route, chemin...)"
  },
  {
    name: "non-accessible",
    displayName: "Non accessible"
  },
  {
    name: "other",
    displayName: "Accès difficile, précisez :"
  }
];
export const ABATTAGE_TAB = [
  {
    name: "abattage-simple",
    displayName: "Abattage simple"
  },
  {
    name: "abattage-en-vue-de-remplacement",
    displayName: "Abattage en vue de remplacement"
  },
  {
    name: "abattage-par-demontage",
    displayName: "Abattage par démontage"
  }
];

export const TRAVAUX_COLLET_TAB = [
  {displayName: "Aucun travaux", name: "aucun-travaux"},
  {displayName: "Préservation de niche écologique", name: "preservation-de-niche-ecologique"},
  {displayName: "Coupe des rejets", name: "coupe-des-rejets"},
  {displayName: "Dessouchage", name: "dessouchage"},
  {displayName: "Mulchage, entretien du pied", name: "mulchage-entretien-du-pied"},
  {displayName: "Protection du pied", name: "protection-du-pied"},
  {
    name: "other",
    displayName: "Autre, précisez :"
  }

];

export const TRAVAUX_TRONC_TAB = [
  {displayName: "Aucun travaux", name: "aucun-travaux"},
  {displayName: "Relevé de couronne", name: "releve-de-couronne"},
  {displayName: "Coupe du lierre", name: "coupe-du-lierre"},
  {displayName: "Mise en sécurité", name: "mise-en-securite"},
  {displayName: "Coupe des rejets", name: "coupe-des-rejets"},
  {displayName: "Taille du gui", name: "taille-du-gui"},
  {displayName: "Traitement des parasites et des nuisibles", name: "traitement-des-parasites"},
  {displayName: "Préservation de niche écologique", name: "Préservation de niche écologique"},
  {name: "other", displayName: "Autre, précisez :"},
  {name: "protection", displayName: "Protection particulière, précisez :"}
];

export const TRAVAUX_HOUPPIER_TAB = [
  {displayName: "Aucun travaux", name: "aucun-travaux"},
  {displayName: "Taille de cohabitation", name: "taille-de-cohabitation"},
  {displayName: "Taille de relevé de couronne", name: "taille-de-relev-de-couronne"},
  {displayName: "Taille d'allègement", name: "taille-dallgement"},
  {displayName: "Taille d'entretien", name: "taille-dentretien"},
  {displayName: "Taille d'éclaircie", name: "taille-dclaircie"},
  {displayName: "Nettoyage sanitaire", name: "nettoyage-sanitaire"},
  {displayName: "Mise en sécurité des branches à risque", name: "mise-en-scurit-des-branches-risque"},
  {displayName: "Taille du gui", name: "taille-du-gui"},
  {displayName: "Taille de gabarit", name: "taille-de-gabarit"},
  {displayName: "Taille travaillée", name: "taille-travaille"},
  {displayName: "Taille d'accompagnement", name: "taille-daccompagnement"},
  {displayName: "Taille de restructuration", name: "taille-de-restructuration"},
  {displayName: "Taille de formation", name: "taille-de-formation"},
  {displayName: "Conduite en trogne", name: "conduite-en-trogne-ttard"},
  {displayName: "Conduite architecturée", name: "conduite-architecturee"},
  {displayName: "Préservation de niche écologique", name: "prservation-de-niche-cologique"},
  {displayName: "Traitement des nuisibles, parasites", name: "traitement-des-nuisibles"},
  {displayName: "Haubanage", name: "haubanage"},
  {name: "other", displayName: "Autre, précisez :"}

];

export const DATE_TRAVAUX_TAB = [
  {displayName: "Dès que possible", name: "immediat"},
  {displayName: "Moins d'1 an", name: "1an"},
  {displayName: "Moins de 2 ans", name: "2ans"},
  {displayName: "Moins de 3 ans ", name: "3ans"},
  {displayName: "5 ans et plus", name: "5ans"}
];


export const TYPE_INTERVENTION_TAB = [
  {displayName: "Réalisation de travaux", name: "ralisation-de-travaux"},
  {displayName: "Visite de contrôle", name: "visite-de-contrle"}
];
