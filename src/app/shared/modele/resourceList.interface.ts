import {Resource} from "./resource";

export interface ResourceListInterface<T extends Resource> {
  datas: T[];
  pages: Number;
  total: Number;
  perPage: Number;
  currentPage: number;
}
