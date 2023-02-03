import {Injectable} from '@angular/core';
import {DataBevaColumnInterface, DataIndexConst} from "../constant/beva.const";

@Injectable()
export class BevaService {

  constructor() {
  }

  /**
   *
   * @param column
   * @param data
   */
  static getValueColumn(column: number, data: DataBevaColumnInterface[]): number {
    return column !== null ? data.find((elt: DataBevaColumnInterface) => elt.column == column).value : null;
  }

  static getNameColumnIndex(displayName: string, data: DataBevaColumnInterface[], dataIndex: DataIndexConst[]): number {
    if (displayName === null) return;
    const healthIndexColumn = dataIndex.find((elt: DataIndexConst) => elt.displayName == displayName) ? dataIndex.find((elt: DataIndexConst) => elt.displayName == displayName).name : null;
    return BevaService.getValueColumn(healthIndexColumn, data);
  }

  /**
   *
   * @param index
   * @param data
   */
  static getDisplayNameIndex(index: number, data: DataIndexConst[]): string {
    return index ? data.find((elt: DataIndexConst) => elt.name == index).displayName : null;
  }

  /**
   *
   * @param index
   * @param data
   */
  static getNameIndex(index: string, data: DataIndexConst[]): number {
    return index && data.find((elt: any) => elt.displayName == index).name;
  }

}
