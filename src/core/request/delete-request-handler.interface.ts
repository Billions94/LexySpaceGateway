import { RequestInit, URLSearchParams } from 'apollo-server-env';

export interface DeleteRequestHandlerInterface {
  delete(params?: URLSearchParams, init?: RequestInit): Promise<any>;
}
