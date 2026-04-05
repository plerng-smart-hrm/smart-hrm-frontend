
export interface ISortFieldItem {
  field: string;
  direction: 'ASC' | 'DESC';
}

export interface IApiParamsRequestSearches {
  field?: string;
  value?: string;
}

export interface IApiRequestUrlQuery {
  urlPath: string;
}
export interface IApiPageRequest {
  pageSize?: number;
  pageNumber?: number;
}

export interface IApiParamsRequest extends IApiPageRequest {
  sort?: ISortFieldItem;
  search?: string | undefined;
  filters?: string | undefined;
}

export interface IApiParamsRequestUrlQuery
  extends IApiRequestUrlQuery,
  IApiParamsRequest { }
