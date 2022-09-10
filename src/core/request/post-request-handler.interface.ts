import { RequestInit, URLSearchParams } from 'apollo-server-env';

export interface PostRequestHandlerInterface {
  post(body: any, params?: URLSearchParams, init?: RequestInit): Promise<any>;
}
