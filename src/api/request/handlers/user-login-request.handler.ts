import { RequestInit } from 'apollo-server-env';
import { PostRequestHandlerInterface } from 'src/core/request/post-request-handler.interface';
import { AbstractRequestHandler } from './abstract-request.handler';

export class UserLoginRequestHandler
  extends AbstractRequestHandler
  implements PostRequestHandlerInterface
{
  protected path = 'users/login';

  async post(body: any, params?: URLSearchParams, init?: RequestInit) {
    init = this.forwardAuthHeader(init);
    
    return await this.executePostRequest(body, params, init);
  }
}
