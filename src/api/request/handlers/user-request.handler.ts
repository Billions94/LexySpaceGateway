import { RequestInit } from 'apollo-server-env';
import { GetRequestHandlerInterface } from 'src/core/request/get-request-handler.interface';
import { PostRequestHandlerInterface } from 'src/core/request/post-request-handler.interface';
import { AbstractRequestHandler } from './abstract-request.handler';

export class UserRequestHandler
  extends AbstractRequestHandler
  implements GetRequestHandlerInterface
{
  protected path = 'users/me';

  async get(params?: URLSearchParams, init?: RequestInit) {
    init = this.forwardAuthHeader(init);

    return await this.executeGetRequest(params, init);
  }
}
