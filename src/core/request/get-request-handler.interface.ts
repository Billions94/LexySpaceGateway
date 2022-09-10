import { RequestInit, URLSearchParamsInit } from 'apollo-server-env';

export interface GetRequestHandlerInterface {
  get(params?: URLSearchParamsInit, init?: RequestInit): Promise<any>;
}
