import { RequestInit } from 'apollo-server-env';
import { PostRequestHandlerInterface } from '../../../core/request/post-request-handler.interface';
import { AbstractRequestHandler } from './abstract-request.handler';

export class ReplyCreateRequestHandler
  extends AbstractRequestHandler
  implements PostRequestHandlerInterface
{
  protected path = 'replies/{commentId}';

  async post(body: any, params?: URLSearchParams, init?: RequestInit) {
    init = this.forwardAuthHeader(init);

    return await this.executePostRequest(body, params, init);
  }
}
