import { RequestInit, URLSearchParams } from 'apollo-server-env';

export interface PatchRequestHandlerInterface {
  patch(body: any, params?: URLSearchParams, init?: RequestInit): Promise<any>;
}
