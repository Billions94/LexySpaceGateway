import { RequestInit } from 'apollo-server-env';
import { GetRequestHandlerInterface } from '../../../core/request/get-request-handler.interface';
import { AbstractRequestHandler } from './abstract-request.handler';

export class GetPostRequestHandler
  extends AbstractRequestHandler
  implements GetRequestHandlerInterface
{
  protected path = 'posts/{postId}';

  async get(params?: URLSearchParams, init?: RequestInit) {
    return await this.executeGetRequest(params, init);
  }
}
