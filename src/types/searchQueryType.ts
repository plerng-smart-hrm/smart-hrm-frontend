import { ISelectOption } from "./OptionType";

export interface ISearchQuery {
  column: string | string[];
  op: string;
  value: string;
}
export interface IColumnQuery {
  column: ISelectOption[];
  type: ISelectOption[];
}
