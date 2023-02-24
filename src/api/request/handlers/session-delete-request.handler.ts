import { RequestInit } from 'apollo-server-env';
import { DeleteRequestHandlerInterface } from '../../../core/request/delete-request-handler.interface';
import { AbstractRequestHandler } from './abstract-request.handler';

export class SessionDeleteRequestHandler
  extends AbstractRequestHandler
  implements DeleteRequestHandlerInterface
{
  protected path = 'sessions';

  async delete(params?: URLSearchParams, init?: RequestInit) {
    init = this.forwardAuthHeader(init);

    return await this.executeDeleteRequest(params, init);
  }
}
