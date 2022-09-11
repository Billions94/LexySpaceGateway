import { RequestInit } from 'apollo-server-env';
import { DeleteRequestHandlerInterface } from 'src/core/request/delete-request-handler.interface';
import { AbstractRequestHandler } from './abstract-request.handler';

export class UserDeleteRequestHandler
  extends AbstractRequestHandler
  implements DeleteRequestHandlerInterface
{
  protected path = 'users/{userId}';

  async delete(params?: URLSearchParams, init?: RequestInit) {
    init = this.forwardAuthHeader(init);
    
    return await this.executeGetRequest(params, init);
  }
}
