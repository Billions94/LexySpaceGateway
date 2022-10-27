import { RequestInit } from 'apollo-server-env';
import { GetRequestHandlerInterface } from '../../../core/request/get-request-handler.interface';
import { AbstractRequestHandler } from './abstract-request.handler';

export class PostGetRequestHandler
  extends AbstractRequestHandler
  implements GetRequestHandlerInterface
{
  protected path = 'posts/{postId}';

  async get(params?: URLSearchParams, init?: RequestInit) {
    init = this.forwardAuthHeader(init);
    
    return await this.executeGetRequest(params, init);
  }
}
