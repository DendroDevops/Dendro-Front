export interface ColumnInterface {
  name: string;
  display?: string;
  style?: string;
  isModelProperty: boolean
  edit?: boolean;
  delete?: boolean;
  isObject?: boolean;
  objectName?: string;
  isDate?: boolean
  isCurrency?: boolean;
  isVisible: boolean;
  isCheck?: boolean;
  isLink?: boolean;
  isSort?: boolean;
  sortBy?: string;
}
