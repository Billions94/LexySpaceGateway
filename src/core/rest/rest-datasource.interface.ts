import { RequestInit, URLSearchParamsInit } from 'apollo-server-env';
import { Body } from 'apollo-datasource-rest/dist/RESTDataSource';

export const REST_DATASOURCE = 'REST DATASOURCE';

export interface RestDatasourceInterface {
  get<TResult = any>(
    path: string,
    params?: URLSearchParamsInit,
    init?: RequestInit
  ): Promise<TResult>;

  post<TResult = any>(
    path: string,
    body?: any,
    init?: RequestInit
  ): Promise<TResult>;

  delete<TResult = any>(
    path: string,
    params?: URLSearchParamsInit,
    init?: RequestInit
  ): Promise<TResult>;

  patch<TResult = any>(
    path: string,
    body?: Body,
    init?: RequestInit
  ): Promise<TResult>;
}
