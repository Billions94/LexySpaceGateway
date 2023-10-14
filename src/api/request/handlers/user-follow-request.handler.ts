import { AbstractRequestHandler } from './abstract-request.handler';
import { PostRequestHandlerInterface } from '../../../core/request/post-request-handler.interface';
import { RequestInit } from 'apollo-server-env';

export class UserFollowRequestHandler
  extends AbstractRequestHandler
  implements PostRequestHandlerInterface
{
  protected path = 'users/current-user/follow';

  async post(body?: any, params?: URLSearchParams, init?: RequestInit) {
    init = this.forwardAuthHeader(init);

    return await this.executePostRequest(body, params, init);
  }
}
