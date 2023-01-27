export interface ColumnInterface {
  name: string;
  display?: string;
  style?: any;
  isModelProperty: boolean
  edit?: boolean;
  delete?: boolean;
  isObject?: boolean;
  objectName?: string;
  isDate?: boolean
  isCurrency?: boolean;
  isVisible: boolean;
  isCheck?: boolean;
  isModalLink?: boolean;
  isModal?: boolean;
  modalComponent?: any;
  open?: (content, options: any, data: any) => void;
  modalTitle?: string;
  isSwitcher?: boolean;
  switchFunc?: (data: any, idx: number) => void;
  isIcon?: boolean;
  icons?: {iconSuccesClass: string, iconErrorClass: string};
  isComplex?: true;
  thClass?: string;
  tdClass?: string;
  dateFormat?: string;
  tdValue?: (arg: any) => any;
  tdClassFn?: (arg: any) => any;
  isString?: boolean;
  isLowerCase?: boolean;
  isNumber?: boolean;
  isSort?: boolean;
  sortBy?: string;
}
