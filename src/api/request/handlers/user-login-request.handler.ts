import { RequestInit } from 'apollo-server-env';
import { PostRequestHandlerInterface } from '../../../core/request/post-request-handler.interface';
import { AbstractRequestHandler } from './abstract-request.handler';

export class UserLoginRequestHandler
  extends AbstractRequestHandler
  implements PostRequestHandlerInterface
{
  protected path = 'sessions/create';

  async post(body: any, params?: URLSearchParams, init?: RequestInit) {
    return await this.executePostRequest(body, params, init);
  }
}
