import { AbstractRequestHandler } from './abstract-request.handler';
import { RequestInit } from 'apollo-server-env';

export class UserGetAudienceRequestHandler extends AbstractRequestHandler {
  protected path = 'users/{id}/audience';

  async get(params?: URLSearchParams, init?: RequestInit) {
    init = this.forwardAuthHeader(init);

    return await this.executeGetRequest(params, init);
  }
}
