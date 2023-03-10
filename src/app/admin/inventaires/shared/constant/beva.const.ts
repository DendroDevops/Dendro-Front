export interface DataBevaColumnInterface {
  column: number,
  value: number
}

export interface DataIndexConst {
  name: number,
  displayName: string
}

export const LOCATION_INDEX_TAB: DataIndexConst[] = [
  {displayName: "Centre ville", name: 10},
  {displayName: "Agglomération", name: 8},
  {displayName: "Zone rurale", name: 6}
];

export const HEALTH_INDEX_TAB: DataIndexConst[] = [
  {displayName: "Sain - Vigoureux", name: 1},
  {displayName: "Sain - Vigueur moyenne", name: 2},
  {displayName: "Sain - Peu vigoureux", name: 3},
  {displayName: "Sain - Sans vigueur", name: 4},
  {displayName: "Malade - Vigoureux", name: 5},
  {displayName: "Malade - Vigueur moyenne", name: 6},
  {displayName: "Malade - Peu vigoureux", name: 7},
  {displayName: "Malade - Sans Vigueur", name: 8},
  {displayName: "Dépérissant - Peu vigoureux", name: 11},
  {displayName: "Dépérissant - Sans vigueur", name: 12},
];
// Index value
export const AESTHETIC_INDEX_TAB: DataIndexConst[] = [
  {displayName: "Solitaire - Remarquable", name: 1},
  {displayName: "Solitaire - Beau sujet", name: 2},
  {displayName: "Solitaire - Mal formé, âgé", name: 3},
  {displayName: "Solitaire - Sans intérêt", name: 4},
  {displayName: "Groupe < 5 - Remarquable", name: 5},
  {displayName: "Groupe < 5 - Beau sujet", name: 6},
  {displayName: "Groupe < 5 - Mal formé, âgé", name: 7},
  {displayName: "Groupe < 5 - Sans intérêt", name: 8},
  {displayName: "Alignement groupe > 5 - Beau sujet", name: 10},
  {displayName: "Alignement groupe > 5 - Mal formé, âgé", name: 11},
  {displayName: "Alignement groupe > 5 - Sans intérêt", name: 12}
];

// colum Value
export const AESTHETIC_INDEX_VALUE: DataBevaColumnInterface[] = [
  {column: 1, value: 6}, {column: 2, value: 5}, {column: 3, value: 3},
  {column: 4, value: 1}, {column: 5, value: 5}, {column: 6, value: 4}, {column: 7, value: 2},
  {column: 8, value: 1}, {column: 10, value: 4}, {column: 11, value: 2}, {column: 12, value: 1}
];
// Index value, Mapping data index value with column
export const HEALTH_INDEX_VALUE: DataBevaColumnInterface[] = [
  {column: 1, value: 4}, {column: 2, value: 2}, {column: 3, value: 1}, {column: 4, value: 1}, {column: 5, value: 2},
  {column: 6, value: 2}, {column: 7, value: 1}, {column: 8, value: 1}, {column: 11, value: 1}, {column: 12, value: 0}
];
