import { RequestInit } from 'apollo-server-env';
import { PatchRequestHandlerInterface } from '../../../core/request/patch-request-handler.interface';
import { AbstractRequestHandler } from './abstract-request.handler';

export class UserUpdateRequestHandler
  extends AbstractRequestHandler
  implements PatchRequestHandlerInterface
{
  protected path = 'users/current-user';

  async patch(body: any, params?: URLSearchParams, init?: RequestInit) {
    init = this.forwardAuthHeader(init);

    return await this.executePatchRequest(body, params, init);
  }
}
